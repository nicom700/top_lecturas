import TitleH1 from 'src/components/TitleH1';

export default function NotFound() {
    return (
        <div className="my-8 max-md:px-2 px-8 w-full flex flex-col items-center">
            <div className="max-w-7xl w-full flex flex-col gap-4 justify-around p-6">
                <TitleH1 text="Pagina no encontrada 😵" />
            </div>
        </div>
    );
}
