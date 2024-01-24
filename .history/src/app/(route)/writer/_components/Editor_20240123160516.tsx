// ... (이전 코드)

const Editor = () => {
    // ... (이전 코드)
  
    const [deviceInfo, setDeviceInfo] = useRecoilState(deviceInfoState);
    const [regForm, setRegForm] = useRecoilState(registerForm);
    const [session, setSession] = useRecoilState(sessionState);
    const [userId, setUserId] = useState<string>("");
    const [edtDate, setEdtDate] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [textLength, setTextLength] = useState<number>(0);
    const [wordBreak, setWordBreak] = useState<string>("A");
    const [saveState, setSaveState] = useState("normal");
    const timer = useRef<number | null>(null);
  
    // ... (이전 코드)
  
    const getNote = async () => {
      const data = { key: userId };
  
      try {
        const response = await handleApiRequest("http://localhost:4000/note/getNote", "POST", data);
        const objNote = response.data[0];
  
        if (objNote) {
          const lastEditTime = Moment.unix(objNote.n_wrt_date).format("YYYY.MM.DD HH:mm:ss");
          setEdtDate(lastEditTime);
          setNote(objNote.n_text);
          setTextLength(objNote.n_text.length);
        }
      } catch (error) {
        setSaveState("error");
        console.error(error); // 에러 출력 추가
      }
    };
  
    // ... (이전 코드)
  };
  
  export default Editor;
  