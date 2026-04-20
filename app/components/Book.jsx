import Image from "next/image";
import bookOpen from "../../public/images/bookOpen.svg";
import bookClose from "../../public/images/bookClose.svg";

function Book({ onClick, displayPalette }) {
    return (
        <div onClick={onClick} className="cursor-pointer">
            {displayPalette ? <Image src={bookOpen} width={60} /> : <Image src={bookClose} width={60} />}
        </div>
    );
}

export default Book;
