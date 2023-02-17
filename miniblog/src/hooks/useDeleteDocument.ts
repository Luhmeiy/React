// libraries
import { deleteDoc, doc } from "firebase/firestore";
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

const deleteReducer = (state: StateProps, action: ActionProps): StateProps => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload!}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action: ActionProps) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const deleteDocument = async (id: string) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
            });
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

    return {deleteDocument, response};
}