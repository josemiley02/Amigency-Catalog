export const Header = () => {
    return (
        <header className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:items-end sm: mx-10">
            <figure className="w-45">
                <img width="451" height="204" src="./images/logo.webp" alt="Logo de Amigency"></img>
            </figure>

            <div className="flex gap-2 relative">
                <a href="https://www.instagram.com/amigency.sa?igsh=bDJpaWFkNTNpa21h" target="_BLANK">
                    <span className="inline-block size-4 bg-cover bg-[url(./images/icons/instagram.webp)]"></span>
                </a>
                <a href="https://chat.whatsapp.com/JdDieBGZJyGGKZMlrD89GF?mode=hqrt2" target="_BLANK">
                    <span className="inline-block size-5 relative -botton-1 bg-cover bg-[url(./images/icons/whatsapp.webp)]"></span>
               </a>
                <span className="absolute w-[130%] h-2 bg-pastel-mint bottom -1/2 right-1/2 translate-1/2 -z-1 rounded-md"></span>
            </div>
        </header>
    )
}