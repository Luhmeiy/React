// libraries
import { useLocation } from "react-router-dom";

// React
import { useMemo } from "react";

export function useQuery() {
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}