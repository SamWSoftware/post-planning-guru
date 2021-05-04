import React from 'react';

interface Props {
    onSignin: () => void;
}

const Signin: React.FC<Props> = () => {
    return (
        <div className="signin">
            <h1>Sign In Page</h1>
        </div>
    );
};

export default Signin;
