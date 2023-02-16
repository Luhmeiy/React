// libraries
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

// React
import { useEffect, useState } from "react";

export const useFetchDocument = (docCollection: string, id: string) => {
    const [document, setDocument] = useState<DocumentData | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);


    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return;

            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());

                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    setError(error.message);

                    setLoading(false);
                }
            }
        }

        loadDocument();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        document,
        loading,
        error
    };
}