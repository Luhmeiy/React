// libraries
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

// React
import { useEffect, useState } from "react";

interface DocumentsProps {
    id: string;
	title: string;
	createdBy: string;
	image: string;
	tagsArray: string[];
	body: string;
}

export const useFetchDocuments = (docCollection: string, search: string | null = null, uid = null) => {
    const [documents, setDocuments] = useState<DocumentsProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);


    useEffect(() => {
        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q;

                if (search) {
                    q = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"));
                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"));
                }


                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            title: doc.data().title,
                            createdBy: doc.data().createdBy,
                            image: doc.data().image,
                            tagsArray: doc.data().tagsArray,
                            body: doc.data().body
                        }))
                    )
                });

                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    setError(error.message);

                    setLoading(false);
                }
            }
        }

        loadData();
    }, [docCollection, documents, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        documents,
        loading,
        error
    };
}