// libraries
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// React
import { useEffect, useReducer, useState } from "react";

interface StateProps {
    loading: boolean | null;
    error: string | null;
}

const initialState: StateProps = {
    loading: null,
    error: null
}

interface ActionProps {
    type: string;
    payload?: string | void;
}

const updateReducer = (state: StateProps, action: ActionProps): StateProps => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "UPDATED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload!}
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action: ActionProps) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const updateDocument = async (id: string, data: {}) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const docRef = await doc(db, docCollection, id);
            const updatedDocument = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument
            })
        } catch (error) {
            if (error instanceof Error) {
                checkCancelBeforeDispatch({
                    type: "ERROR",
                    payload: error.message
                })
            }
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {updateDocument, response};
}