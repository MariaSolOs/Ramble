import React, {useState} from 'react';

export const AdminContext = React.createContext({
    token: '',
    permissions: []
});

export default (props) => {
    const [token, setToken] = useState();
    const [permissions, setPermissions] = useState();

    return (
       <AdminContext.Provider value={{ token, permissions }}>
            {props.children}
        </AdminContext.Provider>
    );
}

