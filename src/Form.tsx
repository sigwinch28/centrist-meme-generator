import React, { useEffect, useState, useCallback } from 'react';
import {ArticleProps} from './Article';
import pepe from './images/pepe.png';



interface InputProps {
    onChange: (value: string) => void;
    disabled: boolean;
}

const FileInput: React.FC<InputProps> = ({onChange, disabled}: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files?.[0];
        if (file) {
            let url = URL.createObjectURL(file);
            onChange(url);
        }
        
    }

    return (
        <input type="file" disabled={disabled} onChange={handleChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
    )
}

const UrlInput: React.FC<InputProps> = ({onChange, disabled} : InputProps) => {
    const [url, setUrl] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
        onChange(e.target.value);
    }

    return (
        <input type="text" disabled={disabled} onChange={handleChange} value={url} className="border-2 border-gray-400 p-2 focus:ring-4" />
    )
}

interface MugshotInputProps {
    onChange: (value: string) => void;
}

enum MugshotInputSource {
    None = 0,
    File,
    Pepe,
    URL
}


const MugshotInput: React.FC<MugshotInputProps> = ({ onChange }: MugshotInputProps) => {
    const [source, setSource] = useState(MugshotInputSource.Pepe);
    const [url, setUrl] = useState("");
    const [file, setFile] = useState("");

    useEffect(() => {
        switch (source) {
            case MugshotInputSource.None:
                onChange("");
                break;
            case MugshotInputSource.Pepe:
                onChange(pepe);
                break;
            case MugshotInputSource.File:
                onChange(file);
                break;
            case MugshotInputSource.URL:
                onChange(url);
                break;
        }
    }, [onChange, source, url, file]);

    const radioButton = (inputSource: MugshotInputSource) =>
        <input
            type="radio"
            name="source" 
            value={inputSource} 
            checked={source === inputSource} 
            onChange={() => setSource(inputSource)}
            className="mr-1"
        />

    return (
        <div>
            <div>
                <label className="pr-2">
                    {radioButton(MugshotInputSource.None)}
                    None
                    </label>
            </div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotInputSource.Pepe)}
                    Sad pepe
                    </label>
            </div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotInputSource.URL)}
                    URL
                    </label>
                <UrlInput
                    disabled={source !== MugshotInputSource.URL}
                    onChange={setUrl}
                />
            </div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotInputSource.File)}
                    File
                    </label>
                <FileInput
                    disabled={source !== MugshotInputSource.File}
                    onChange={setFile}
                />
            </div>
        </div>
    )
}

interface FormProps {
    article: ArticleProps;
    onChange: React.Dispatch<React.SetStateAction<ArticleProps>>
}


const Form: React.FC<FormProps> = ({ article, onChange }: FormProps) => {
    const handleHeadlineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange((article) => ({...article, headline: e.target.value}));
    }, [onChange]);

    const handlePunditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange((article) => ({...article, pundit: e.target.value}));
    }, [onChange]);

    const handleMugshotChange = useCallback((mugshot: string) => {
            onChange((article) => ({...article, mugshot: mugshot}));
    }, [onChange]);

    return (
        <form className=" border-t border-b lg:border-l lg:border-r px-4 p-4 my-4 text-lg">
            <h2 className="font-bold mb-1">Headline</h2>
            <input type="text" value={article.headline} onChange={handleHeadlineChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            <br />
            <h2 className="font-bold mt-4 mb-1">Pundit Name</h2>
            <input type="text" value={article.pundit} onChange={handlePunditChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            <h2 className="font-bold mt-4 mb-1">Pundit Mugshot</h2>
            <MugshotInput onChange={handleMugshotChange}/>
        </form>
    )
}

export default Form