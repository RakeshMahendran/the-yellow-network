import React, { useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

interface FeedbackFormProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onRequestClose }) => {
    const [feedback, setFeedback] = useState<string>('');

    const handleFeedbackSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const jwtAccessToken = localStorage.getItem('jwtAccessToken');

        if (jwtAccessToken) {
            try {
                const response = await axios.post(
                    'https://theyellow.group/api/feedback/',
                    {
                        message: feedback
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwtAccessToken}`,
                        }
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.error("Error occurred while submitting feedback:", error);
            }
        } else {
            console.error("JWT token not found in localStorage");
        }

        onRequestClose()
        setFeedback('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Feedback Form"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div className="bg-zinc-300 w-1/3 h-1/3 text-center pt-6 px-4 rounded-sm relative">
                <button
                    className="absolute top-1 right-1 text-white"
                    onClick={onRequestClose}
                >
                    <MdClose size={20} />
                </button>
                <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                    <textarea
                        className="w-full h-32 border rounded-sm p-2 focus:outline-none border-gray-300 resize-none"
                        placeholder="Feedback"
                        autoFocus
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-white hover:bg-amber-200 text-black hover:text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default FeedbackForm;