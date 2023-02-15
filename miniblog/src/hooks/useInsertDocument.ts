// libraries
import { addDoc, collection, DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";

// React
import { useEffect, useReducer, useState } from "react";

interface StateProps {
    loading: boolean | null;
    error: string | DocumentReference<DocumentData> | null;
}

const initialState: StateProps = {
    loading: null,
    error: null
}

interface ActionProps {
    type: string;
    payload?: string | DocumentReference<DocumentData>;
}

const insertReducer = (state: StateProps, action: ActionProps): StateProps => {
    switch(action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload!}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action: ActionProps) => {
        if (!cancelled) {
            dispatch(action);
        }
    }

    const insertDocument = async (document: {}) => {
        checkCancelBeforeDispatch({
            type: "LOADING"
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()};

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
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

    return {insertDocument, response};
}