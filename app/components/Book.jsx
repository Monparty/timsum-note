import Image from "next/image";
import bookOpen from "../../public/images/bookOpen.svg";
import bookClose from "../../public/images/bookClose.svg";

function Book({ onClick, displayPalette }) {
    return (
        <div onClick={onClick} className="cursor-pointer">
            {displayPalette ? (
                <Image src={bookOpen} width={55} alt="book" className="select-none [-webkit-user-drag:none] [user-drag:none]" />
            ) : (
                <Image src={bookClose} width={55} alt="book" className="select-none [-webkit-user-drag:none] [user-drag:none] hover:-translate-y-1 transition-all" />
            )}
        </div>
    );
}

export default Book;
