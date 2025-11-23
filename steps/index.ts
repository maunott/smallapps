import express from "express";
import path from "path";
import multer from "multer";
import fs from "fs/promises";
import fsSync from "fs";
import csv from "csv-parser";


const app: express.Application = express();
const port: number = 3000;

// Ensure the public/data directory exists
const dataDir = path.resolve(__dirname, "public", "data");
if (!fsSync.existsSync(dataDir)) {
    fsSync.mkdirSync(dataDir, { recursive: true });
}

// multer handler
const uploadKasittelija: express.RequestHandler = multer({
    dest: path.resolve(__dirname, "tmp"),
    limits: {
        fileSize: 1024 * 500
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "application/json" || file.mimetype === "text/csv") {
            callback(null, true);
        } else {
            callback(new Error("Only JSON and CSV files are allowed"));
        }
    }
}).single("tiedosto");

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, "public")));

// Function to get Finnish month name
function getFinnishMonthName(month: number): string {
    const months = [
        "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
        "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
    ];
    return months[month - 1];
}

// Function to validate JSON format
function validateJsonData(data: any): boolean {
    if (!Array.isArray(data)) return false;
    const ppSet = new Set<number>();
    for (const item of data) {
        if (!item.hasOwnProperty('pp') || typeof item.pp !== 'number' ||
            !item.hasOwnProperty('kk') || typeof item.kk !== 'number' ||
            !item.hasOwnProperty('vvvv') || typeof item.vvvv !== 'number' ||
            !item.hasOwnProperty('askeleet') || typeof item.askeleet !== 'number') {
            return false;
        }
        if (ppSet.has(item.pp)) {
            return false; // Duplicate pp value found
        }
        ppSet.add(item.pp);
    }
    return true;
}

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// File upload
app.post("/upload", async (req: express.Request, res: express.Response) => {

    uploadKasittelija(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          
            res.render("tulokset", { months: [], monthName: '', virhe: "Tiedosto on tiedostokooltaan liian suuri (> 500kt).", teksti: req.body.teksti });
        } else if (err) {
       
            res.render("tulokset", { months: [], monthName: '', virhe: "Väärä tiedostomuoto. Käytä ainoastaan JSON- tai CSV-tiedostoja.", teksti: req.body.teksti });
        } else {
            if (req.file) {
         

                const filePath = path.resolve(__dirname, "tmp", req.file.filename);
                const fileContent = await fs.readFile(filePath, "utf-8");
             
                let jsonData;
                try {
                    if (req.file.mimetype === "application/json") {
                        jsonData = JSON.parse(fileContent);
                        if (!validateJsonData(jsonData)) {
                            throw new Error("Json-tiedosto korruptoitunut");
                        }
                    } else if (req.file.mimetype === "text/csv") {
                        jsonData = [];
                        await new Promise<void>((resolve, reject) => {
                            fsSync.createReadStream(filePath)
                                .pipe(csv({ separator: ';' })) // Specify the delimiter
                                .on("data", (data) => jsonData.push(data))
                                .on("end", () => {
                                 
                                    if (!validateJsonData(jsonData)) {
                                        return reject(new Error("CSV-tiedosto korruptoitunut"));
                                    }
                                    resolve();
                                })
                                .on("error", (error) => {
                         
                                    reject(error);
                                });
                        });
                    }
                } catch (parseError) {
           
                    return res.render("tulokset", { 
                        months: [], 
                        monthName: '', 
                        virhe: "Tiedoston sisältämä data on korruptoitunut. Tietojen lukeminen ei onnistu." 
                    });
                }

                // Save the parsed data to a new JSON file
                const newFilePath = path.resolve(__dirname, "public", "data", `${req.file.filename}.json`);
                await fs.writeFile(newFilePath, JSON.stringify(jsonData, null, 2));
     

                // Redirect to the results page with the JSON data
                res.redirect(`/tulokset?file=${req.file.filename}.json`);
            } else {
        
                res.render("tulokset", { months: [], monthName: '', virhe: "Tiedostoa ei ole valittu", teksti: req.body.teksti });
            }
        }
    });
});

// Results page
app.get('/tulokset', async (req, res) => {
    const fileName = req.query.file as string;
    if (!fileName) {
        return res.render('tulokset', { months: [], monthName: '', virhe: "Tiedostoa ei ole valittu" });
    }

    const filePath = path.resolve(__dirname, "public", "data", fileName);
    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        const monthName = jsonData.length > 0 ? getFinnishMonthName(jsonData[0].kk) : '';
        res.render('tulokset', { months: jsonData, monthName, virhe: '' });
    } catch (err) {
      
        res.render('tulokset', { months: [], monthName: '', virhe: "Tiedostoa ei pystytä lukemaan" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});