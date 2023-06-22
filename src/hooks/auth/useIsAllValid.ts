
import { useState, useEffect } from 'react';

const useIsAllValid = ([...rest]):[ isAllValid:boolean ] => {
    const [ isAllValid, setIsAllValid ] = useState<boolean>(false);

    useEffect(() => {
        const newIsAllVaild = rest.reduce((acc, cur) => acc && cur, true);
        console.log('IsAllVaild: ',newIsAllVaild);
        setIsAllValid(newIsAllVaild);
    }, [rest]);

    return [ isAllValid ];
};

export default useIsAllValid;