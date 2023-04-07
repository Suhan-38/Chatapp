import {
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { usercontext } from "./Mycontext";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const { user } = useContext(usercontext);
    const INITIAL_STATE = {
      chatId: "null",
      userm: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            userm: action.payload,
            chatId:
              user.uid > action.payload.uid
                ? user.uid + action.payload.uid
                : action.payload.uid + user.uid,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };