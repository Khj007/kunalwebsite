import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
// context creation
// provider
// consumer remove
// useContext hook


let API ="http://hn.algolia.com/api/v1/search?";

const initialState ={
    isLoading : true,
    query: "HTML",
    nbPages: 0,
    page: 0,
    hits:[],
};

// context creation
const AppContext = React.createContext();

// to create provider
const AppProvider = ({children}) =>{

    // const [state, setState] = useState(initialState); //useState
    const [state, dispatch] = useReducer(reducer, initialState); //useReducer

    const fetchApiData = async (url) =>{

        dispatch({type: "SET_LOADING"});
        
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type:"GET_STORIES",
                payload:{
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
        })
            // isLoading = false;
        }catch(error){
            console.log(error);
        }
    };

    // to remove the post
    const removePost = (post_ID) => {
        dispatch({type: "REMOVE_POST", payload: post_ID});
    };

    useEffect(() => {
      fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    }, []);

    return(
        <AppContext.Provider value={{...state, removePost}}>{children}</AppContext.Provider>
    )
};

// custom hook create
const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};