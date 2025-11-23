import { useRef, useState } from 'react';
import { StatusBar, Image, StyleSheet, View } from 'react-native';
import { Appbar, FAB, PaperProvider, Text, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { CameraView, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';

interface Kuvaustiedot {
  kuvaustila?: boolean;
  virhe: string;
  kuva?: CameraCapturedPicture;
  info: string;
  nimi?: string;
}

const serverUrl = 'http://192.168.1.102:3000/upload';

const App: React.FC = (): React.ReactElement => {
  const [kameraLupa, pyydaKameraLupa] = useCameraPermissions();
  const [kuvaustiedot, setKuvaustiedot] = useState<Kuvaustiedot>({
    kuvaustila: false,
    virhe: '',
    info: '',
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [objectName, setObjectName] = useState('');
  const [takingPhoto, setTakingPhoto] = useState(false);
  const kameraRef = useRef<CameraView>(null);

  const kaynnistaKamera = async (): Promise<void> => {
    const { status } = await pyydaKameraLupa();
    if (status !== 'granted') {
      setKuvaustiedot({
        ...kuvaustiedot,
        virhe: 'Ei lupaa kameran käyttöön.',
      });
      return;
    }
    setKuvaustiedot({
      ...kuvaustiedot,
      kuvaustila: true,
      virhe: '',
    });
  };

  const otaKuva = async (): Promise<void> => {
    if (takingPhoto || !kameraRef.current) {
      alert('Camera is not ready. Please try again.');
      return;
    }
    setTakingPhoto(true);
    setKuvaustiedot({
      ...kuvaustiedot,
      info: 'Odota hetki...',
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const kuva: CameraCapturedPicture = await kameraRef.current.takePictureAsync();
      setKuvaustiedot({
        ...kuvaustiedot,
        kuvaustila: false,
        kuva: kuva,
        info: '',
      });
      setDialogVisible(true);
    } catch (error) {
      alert('An error occurred while taking the photo. Please try again.');
    } finally {
      setTakingPhoto(false);
    }
  };

  const handleDialogSave = async () => {
  if (!kuvaustiedot.kuva) return;

  // Sulje dialogi ja nollaa tilat heti
  setDialogVisible(false);
  setKuvaustiedot({
    ...kuvaustiedot,
    kuva: undefined,
    nimi: undefined,
  });
  setObjectName('');

  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to save photos was denied.');
      return;
    }
    await MediaLibrary.createAssetAsync(kuvaustiedot.kuva.uri);

    const formData = new FormData();
    formData.append('name', objectName);
    formData.append('image', {
      uri: kuvaustiedot.kuva.uri,
      type: 'image/jpeg',
      name: `${objectName}.jpg`,
    } as any);

    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (response.ok) {
      alert('Kuva lähetetty palvelimelle!');
    } else {
      alert('Kuvan lähetys epäonnistui!');
    }
  } catch (error) {
    alert('An error occurred while saving or uploading the photo. Please try again.');
  }
};
  const aloitusNakyma = () => (
    <>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.Content
          title="Asuntovälittäjän kamerasovellus"
          titleStyle={styles.appbarTitle}
        />
        <Appbar.Action icon="camera" onPress={kaynnistaKamera} />
      </Appbar.Header>
      <View style={styles.container}>
        {kuvaustiedot.virhe ? (
          <Text style={styles.errorText}>{kuvaustiedot.virhe}</Text>
        ) : null}
        {Boolean(kuvaustiedot.kuva) && (
          <Image style={styles.scaledImage} source={{ uri: kuvaustiedot.kuva!.uri }} />
        )}
        {Boolean(kuvaustiedot.nimi) && (
          <Text style={styles.imageName}>Kuvan nimi: {kuvaustiedot.nimi}</Text>
        )}
      </View>
    </>
  );

  const kameraNakyma = () => (
    <View style={styles.cameraFullScreen}>
      <CameraView style={StyleSheet.absoluteFill} ref={kameraRef} />
      {Boolean(kuvaustiedot.info) && (
        <Text style={{ color: '#fff', position: 'absolute', top: 40, alignSelf: 'center' }}>
          {kuvaustiedot.info}
        </Text>
      )}
      <FAB
        style={styles.nappiOtaKuva}
        icon="camera"
        label="Ota kuva"
        onPress={otaKuva}
      />
      <FAB
        style={styles.nappiSulje}
        icon="close"
        label="Sulje"
        onPress={() => setKuvaustiedot({ ...kuvaustiedot, kuvaustila: false })}
      />
    </View>
  );

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {!kuvaustiedot.kuvaustila ? aloitusNakyma() : kameraNakyma()}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
            dismissable={false}
            style={styles.dialog}
          >
            <Dialog.Content>
              <TextInput
                label="Kuvan nimi"
                value={objectName}
                onChangeText={(text: string) => setObjectName(text)}
                style={styles.textInput}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setDialogVisible(false);
                  setKuvaustiedot({
                    ...kuvaustiedot,
                    kuva: undefined,
                    nimi: undefined,
                  });
                  setObjectName('');
                }}
                style={styles.cancelButton}
              >
                Peruuta
              </Button>
              <Button onPress={handleDialogSave} style={styles.saveButton}>
                Lähetä palvelimelle
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  appbarHeader: {
    backgroundColor: '#4285F4',
    elevation: 0,
  },
  appbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kuvaustila: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraFullScreen: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nappiSulje: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  nappiOtaKuva: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  kuva: {
    width: 300,
    height: 400,
    resizeMode: 'stretch',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  scaledImage: {
    width: '100%',
    height: '90%',
    aspectRatio: 3 / 4,
    marginBottom: 10,
  },
  imageName: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  sendButton: {
    marginTop: 10,
  },
  testButton: {
    marginTop: 20,
    padding: 10,
    borderColor: '#4285F4',
    borderWidth: 1,
  },
  dialog: {
    borderWidth: 1,
    borderColor: '#4285F4',
    width: '80%',
    alignSelf: 'center',
    bottom: '0%',
    paddingLeft: '10%',
    paddingRight: '5%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#4285F4',
    width: '90%',
    alignSelf: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#4285F4',
    marginRight: '0%',
    marginLeft: '5%',
  },
  saveButton: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#4285F4',
    marginLeft: '5%',
    padding: 2,
  },
});

export default App;
