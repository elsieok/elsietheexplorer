'use client'
import { IoMdLink } from "react-icons/io";
import { FaFacebookF, FaLinkedinIn, FaEnvelope, FaRedditAlien } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosText } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

const COPY_TOAST_ID = "copy-link-toast";

export default function SharePost ({ postSlug }) {

    const CopyToClipboard = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);

            toast("Copied link", {
                toastId: COPY_TOAST_ID,
                autoClose: 1750,
            });

        } catch (error) {
            toast("Failed to copy link", {
                toastId: COPY_TOAST_ID,
                autoClose: 1750,
            });
        }
    }

    const shareOnPlatform = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(postSlug);

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=${text}&body=${text} - ${url}`;
                break;
            case 'sms':
                shareUrl = `sms:?&body=${text} - ${url}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
                break;
            default:
                break;
        }

        window.open(shareUrl, '_blank');
    }

    return (
        <div 
            style={{
                display: "inline-flex",
                alignItems: "center",
                height: "45px",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid",
                borderColor: "var(--gray-200)",
                background: "var(--bg-surface)",
                color: "var(--gray-500)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
            }}
        >
            Share:
                <button
                    onClick={CopyToClipboard}
                    style={{cursor: "pointer"}}
                    className="flex items-center px-2 py-1 text-sm"
                >
                    <IoMdLink size={20} color="000000"/>
                </button>
                <ToastContainer
                    toastClassName="custom-toast"
                    position="bottom-center"
                    hideProgressBar={true}
                    closeOnClick
                    autoClose={1750}
                    draggable={false} />
                <button
                    onClick={() => shareOnPlatform('facebook')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <FaFacebookF size={16} className="mr-2 text-blue-600" />
                </button>
                <button
                    onClick={() => shareOnPlatform('twitter')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <FaXTwitter size={16} className="mr-2" color="black" />
                </button>
                <button
                    onClick={() => shareOnPlatform('linkedin')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <FaLinkedinIn size={16} className="mr-2 text-blue-700" />
                </button>
                <button
                    onClick={() => shareOnPlatform('email')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <FaEnvelope size={16} className="mr-2 text-gray-500" />
                </button>
                <button
                    onClick={() => shareOnPlatform('sms')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <IoIosText size={19} className="mr-2 text-green-500" />
                </button>
                <button
                    onClick={() => shareOnPlatform('reddit')}
                    style={{cursor: "pointer"}}
                    className="flex items-center py-1 text-sm"
                >
                    <FaRedditAlien size={17} className="mr-2 text-orange-500" />
                </button>
        </div>
    )
}