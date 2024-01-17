import Image from 'next/image';
import logo from '@img/logo.png';

export default function Header(){
    
    return(
        <header>
            <a href=''>
            <Image
            loader={myLoader}
            src="me.png"
            alt="Picture of the author"
            width={500}
            height={500}
            />
            </a>
            <nav>
                nav
            </nav>
        </header>
    );
    
}

