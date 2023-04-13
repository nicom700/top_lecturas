import React from 'react'
import TitleH1 from 'src/components/TitleH1'
import Icon from 'src/components/Icon'
import { Link } from 'react-router-dom'

const US_DATA = [
    {
        name: 'Cecilia',
        lastName: 'Fontana',
        gitLink: 'https://github.com/Cecilia-15',
        linLink: 'https://www.linkedin.com/in/cecilia-fontana-84001a1b6/'
    },
    {
        name: 'Manuel',
        lastName: 'Chamorro',
        gitLink: 'https://github.com/VMchamo',
        linLink: 'https://www.linkedin.com/in/vmchamorro/'
    },
    {
        name: 'Nicolás',
        lastName: 'Moreira',
        gitLink: 'https://github.com/nicom700',
        linLink: 'https://www.linkedin.com/in/nicolasmoreira3/'
    },
    {
        name:'Daniel', 
        lastName: 'Billordo',
        gitLink: 'https://github.com/dabifer',
        linLink: ''
    }
]

export default function Us () {
  return (
    <div className='my-8 max-md:px-6 px-8 w-full flex flex-col items-center gap-4'>
        <TitleH1 text='Sobre nosotros'/>
        <div className='max-h-48 max-sm:w-full max-sm:h-48 w-full flex max-sm:flex-col gap-4 max-sm:gap-3 justify-between'>
            {
                US_DATA.map(data => (
                    <div key={data.linLink} className='max-w-3xl w-full gap-4  text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 p-6 shadow-md rounded-xl mx-1.5 text-center flex	flex-col items-center'>
                        <h2 className='text-lg font-bold my-2' >{data.name} <br/> {data.lastName}</h2>
                        <div className='flex justify-center gap-3'>
                            <Link to={data.gitLink}>
                                <Icon icon='gitHubIcon'/>
                            </Link>
                            <Link to={data.linLink}>
                                <Icon icon='linkedInIcon'/>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
        
        
    </div>
  )
}
