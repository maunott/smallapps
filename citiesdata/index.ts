import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const app: express.Application = express();
const prisma: PrismaClient = new PrismaClient();
const portti: number = Number(process.env.PORT) || 3001;

app.set("view engine", "ejs");

app.get("/", async (req: express.Request, res: express.Response) => {
    
    // haetaan arvot naisten prosenttiosuuden laskemiseksi
    let kaikki = await prisma.kunta.findMany({

        select: {
            kunta: true,
            asukkaatYhteensa: true,
            asukkaatMiehet: true,
            asukkaatNaiset: true
        }
    });
    // määritellään muuttujat kyselyparametreille
    const search = req.query.search as string | undefined;
    const sort = req.query.sort as keyof Prisma.kuntaOrderByWithRelationInput | undefined;
    const order = req.query.order as Prisma.SortOrder | undefined;
    const orderBy: Prisma.kuntaOrderByWithRelationInput = { [sort]: order };

    // haetaan kunnat ja asukasmäärät kyselyparametrien mukaan
    let kunnat;
    if (search) {
        kunnat = await prisma.kunta.findMany({
            where: {
                kunta: {
                    startsWith: search.toLowerCase()
                }
            },
            orderBy,
            select: {
                kunta: true,
                asukkaatYhteensa: true,
                asukkaatMiehet: true,
                asukkaatNaiset: true
            }
        });
        // Muussa tapauksessa haetaan kaikki kunnat.
    } else {
        kunnat = await prisma.kunta.findMany({
            orderBy,
            select: {
                kunta: true,
                asukkaatYhteensa: true,
                asukkaatMiehet: true,
                asukkaatNaiset: true
            }
        });
    }

    // Lasketaan kuntien määrä, asukaskeskiarvo ja naispuolisten asukkaiden prosenttiosuus.
    const totalKunta = kunnat.length;
    const totalAsukkaatYhteensa = kunnat.reduce((sum, kunta) => sum + kunta.asukkaatYhteensa, 0);
    const totalAsukkaatMiehet = kunnat.reduce((sum, kunta) => sum + kunta.asukkaatMiehet, 0);
    const totalAsukkaatNaiset = kunnat.reduce((sum, kunta) => sum + kunta.asukkaatNaiset, 0);
    const totalAsukkaatKeskiarvo = totalKunta > 0 ? totalAsukkaatYhteensa / totalKunta : 0;
    const suomi = kaikki.reduce((sum, kaikki) => sum + kaikki.asukkaatYhteensa, 0);
    const totalAsukkaatNaisetProsentti = totalAsukkaatYhteensa > 0 ? (totalAsukkaatNaiset / suomi) * 100 : 0;
    // Lähetetään tiedot EJS-templatelle joka näkyy käyttäjän selaimessa html.
    res.render("index", { kunnat: kunnat, search: search, sort: sort, order: order, totalKunta, totalAsukkaatKeskiarvo, totalAsukkaatNaisetProsentti });
});

app.listen(portti, () => {
    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`);
});