// src/components/UserHint.tsx (New File)

import * as React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const UserHint: React.FunctionComponent = () => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-dark-card/50 p-3 rounded-lg text-center my-4">
            <p className="text-sm text-medium-text flex items-center justify-center">
                <InfoOutlinedIcon fontSize="small" className="mr-2" />
                For best results, use `.txt` files to Compress and `.qpress` files to Decompress.
            </p>
        </div>
    );
};

export default UserHint;