import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavbarProps {
    open: boolean;
    handleToggleLeftFrame: () => void;
}

const NavBar: React.FC<NavbarProps> = ({ open, handleToggleLeftFrame }) => {

    return (
        <div
            className={`fixed flex bg-white h-max w-full items-center flex-row mt-3 cursor-pointer transition-all ${open ? 'ml-80' : 'ml-2'}`}
            onClick={handleToggleLeftFrame}>
            {open ? (
                <div className={`${open ? '' : 'hidden'}`}>
                    <IoIosArrowBack size={23} />
                </div>
            ) : (
                <div className={`${!open ? '' : 'hidden'}`}>
                    <IoIosArrowForward size={23} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
