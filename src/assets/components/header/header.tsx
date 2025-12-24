export const Header = () => {
    return (
        <header className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:items-end sm: mx-10">
            <figure className="w-45 border">
                <img width="451" height="204" src="./images/logo.webp" alt="Logo de Amigency"></img>
            </figure>

            <div className="flex gap-2 relative">
                <a href="#" target="_BLANK">
                    <span className="inline-block size-4 bg-cover bg-[url(./images/icons/instagram.svg)]"></span>
                </a>
                <a href="#" target="_BLANK">
                    <span className="inline-block size-5 relative -botton-1 bg-cover bg-[url(./images/icons/whatsapp.svg)]"></span>
               </a>
                <span className="absolute w-[130%] h-2 bg-soft-blue-green bottom -1/2 right-1/2 translate-1/2 -z-1 rounded-md"></span>
            </div>
        </header>
    )
}