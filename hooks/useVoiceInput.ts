import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-voice/voice';
import { useCallback, useEffect, useState } from 'react';

interface IVoiceRecognition {
  recognized: string;
  pitch: number;
  error: string;
  started: string;
  end: string;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

const useVoiceInput = () => {
  const [result, setResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (e: any) => {
      setResult(e.value[0]);
    };
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error('Error starting voice recognition:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Error stopping voice recognition:', e);
    }
  };

  return { result, isListening, startListening, stopListening };
};

export default useVoiceInput;

export const useVoiceRecognition = () => {
  const [state, setState] = useState<IVoiceRecognition>({
    recognized: '',
    pitch: 0,
    isRecording: false,
    started: '',
    end: '',
    error: '',
    results: [],
    partialResults: [],
  });

  const resetState = useCallback(() => {
    setState({
      recognized: '',
      pitch: 0,
      isRecording: false,
      started: '',
      end: '',
      error: '',
      results: [],
      partialResults: [],
    });
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error occured while recognizing the voice', error);
    }
  }, []);

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('Error occured while recognizing the voice', error);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
    } catch (error) {
      console.log('Error occured while recognizing the voice', error);
    }
  }, []);

  const destryoRecognizer = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (error) {
      console.log('Error occured while recognizing the voice', error);
    } finally {
      resetState();
    }
  }, [resetState]);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRecording: true,
        started: '✔',
      }));
    };
    Voice.onSpeechRecognized = () => {
      setState((prevState) => ({
        ...prevState,
        recognized: '✔',
      }));
    };
    Voice.onSpeechEnd = () => {
      setState((prevState) => ({
        ...prevState,
        end: '✔',
        isRecording: false,
      }));
    };

    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      setState((prevState) => ({
        ...prevState,
        isRecording: false,
        error: JSON.stringify(e.error),
      }));
    };

    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({
          ...prevState,
          results: e.value!,
        }));
      }
    };
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({
          ...prevState,
          results: e.value!,
        }));
      }
    };
    Voice.onSpeechVolumeChanged = (e) => {
      if (e.value) {
        setState((prevState) => ({
          ...prevState,
          pitch: e.value ? e.value : 0,
        }));
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destryoRecognizer,
  };
};
