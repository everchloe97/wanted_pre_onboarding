type kakaoButton = {
  buttonType: string;
  buttonName: string;
  linkMo: string;
};

interface kakaoOptions {
  pfId: string;
  templateId: string;
  buttons: kakaoButton[];
}

interface alimTalk {
  to: string;
  text: string;
  kakaoOptions: kakaoOptions;
}

export const SIGN_UP_ALIMTALK: alimTalk = {
  to: '',
  text: '',
  kakaoOptions: undefined,
};
