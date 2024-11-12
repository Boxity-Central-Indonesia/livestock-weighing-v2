export const Footer = () => {

    const authorReserved = import.meta.env.VITE_AUTHOR_RESERVED;
    const authorLINK = import.meta.env.VITE_AUTHOR_LINK;
    const clientsNAME = import.meta.env.VITE_CLIENTS_NAME;

    return (
        <>
            <footer className="flex items-center justify-between h-full px-3">
                <span className="text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">
                    ©Copyright 2024 - {clientsNAME || "loading..."}. All rights reserved
                    by &nbsp;
                    <abbr title={authorReserved}>
                        <a
                            href={authorLINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-gray-500"
                        >
                            {authorReserved}
                        </a>
                    </abbr>
                </span>
                <ul className="flex gap-3 w-fit flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a
                            href={authorLINK}
                            className="mr-4 hover:underline md:mr-6 text-gray-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href={authorLINK}
                            className="mr-4 hover:underline md:mr-6 text-gray-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/panduan" className="hover:underline text-gray-500">
                            Documentation
                        </a>
                    </li>
                </ul>
            </footer>
        </>
    )
}