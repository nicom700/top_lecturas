                                    <Icon icon="gitHubIcon" />
import { Link } from 'react-router-dom';
import TitleH1 from 'src/components/TitleH1';
import Icon from 'src/components/Icon';

const US_DATA = [
    {
        name: 'Cecilia',
        lastName: 'Fontana',
        gitLink: 'https://github.com/Cecilia-15',
        linLink: 'https://www.linkedin.com/in/cecilia-fontana-84001a1b6/',
    },
    {
        name: 'Manuel',
        lastName: 'Chamorro',
        gitLink: 'https://github.com/VMchamo',
        linLink: 'https://www.linkedin.com/in/vmchamorro/',
    },
    {
        name: 'Nicolás',
        lastName: 'Moreira',
        gitLink: 'https://github.com/nicom700',
        linLink: 'https://www.linkedin.com/in/nicolasmoreira3/',
    },
    {
        name: 'Daniel',
        lastName: 'Billordo',
        gitLink: 'https://github.com/dabifer',
        linLink: '',
    },
];

export default function Us() {
    return (
        <div className="my-4 max-md:px-6 px-8 w-full flex flex-col items-center justify-between gap-4 overflow-x-hidden">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around">
                <TitleH1 text="Sobre nosotros" />
                <div className="w-full flex flex-wrap justify-center items-stretch gap-4 pb-4">
                    {US_DATA.map((data) => (
                        <div
                            key={data.linLink}
                            className="w-full max-w-[320px] min-w-[290px] max-sm:max-w-full max-sm:min-w-full p-8 flex-1 flex flex-col items-center gap-8 text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 shadow-md rounded-xl text-center "
                        >
                            <h2 className="text-2xl font-bold">
                                {data.name} <br /> {data.lastName}
                            </h2>
                            <div className="flex justify-center gap-4">
                                <Link to={data.gitLink} target="_blank" className="text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark p-3 rounded-full transition-all">
                                    <Icon icon="gitHubIcon" />
                                </Link>
                                <Link to={data.linLink} target="_blank" className="text-primary hover:text-primaryHover dark:text-primaryDark dark:hover:text-primaryHoverDark p-3 rounded-full transition-all">
                                    <Icon icon="linkedInIcon" />
                                </Link>
                                {/* <Link to={data.gitLink} className="text-white dark:hover:text-white bg-primary hover:bg-primaryHover dark:bg-DarkBtn dark:hover:bg-DarkBtnHover p-3 rounded-full transition-all">
                                    <Icon icon="gitHubIcon" />
                                </Link>
                                <Link to={data.linLink} className="text-white dark:hover:text-white bg-primary hover:bg-primaryHover dark:bg-DarkBtn dark:hover:bg-DarkBtnHover p-3 rounded-full transition-all">
                                    <Icon icon="linkedInIcon" />
                                </Link> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
