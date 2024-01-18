'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'

import Image from 'next/image';
import Link from 'next/link'

import logo from '@img/logo.png';
import '@styles/globals.css'


export default function Header(){
    const pathname = usePathname();

    return(
        <header className='header'>
            <Link href="/"><Image className='logo' src={logo} alt=""/></Link>
            <nav>
                <ul>
                    <li><Link href="/writer" className={pathname === '/writer' ? 'active':''}>메모장</Link></li>
                    <li>테스트2</li>
                    <li>테스트3</li>
                </ul>
            </nav>
            <button>설정</button>
        </header>
    );
    
}

