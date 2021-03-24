import React, { useState } from 'react';

interface FormProps {
    headline: string;
    pundit: string;
    mugshot: string;
    onHeadlineChange: (value: string) => void;
    onPunditChange: (value: string) => void;
    onMugshotChange: (value: string) => void;
}

interface PunditMugshotInputProps {
    onMugshotChange: (value: string) => void;
}

enum MugshotMethod {
    None = 0,
    File,
    URL
}

const PunditMugshotInput: React.FC<PunditMugshotInputProps> = ({ onMugshotChange }: PunditMugshotInputProps) => {
    const [method, setMethod] = useState<MugshotMethod>(MugshotMethod.None);
    const [fileUrl, setFileUrl] = useState<string>("");
    const [externalUrl, setExternalUrl] = useState<string>("");

    const handleMethodChange = (method: MugshotMethod) => {
        setMethod(method)
        if (method === MugshotMethod.URL) {
            onMugshotChange(externalUrl)
        } else if (method === MugshotMethod.File) {
            onMugshotChange(fileUrl)
        } else if (method === MugshotMethod.None) {
            onMugshotChange("")
        }
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExternalUrl(e.target.value)
        if (method === MugshotMethod.URL) {
            onMugshotChange(e.target.value)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files?.[0];
        if (file) {
            let url = URL.createObjectURL(file);
            setFileUrl(url)
            if (method === MugshotMethod.File) {
                onMugshotChange(url)
            }
        }
        
    }

    return (
        <div>

            <div>
                <label className="pr-2">
                    <input type="radio" name="method" value={method} checked={method === MugshotMethod.None} onChange={(_) => handleMethodChange(MugshotMethod.None)} className="mr-1" />
                    None
                    </label>
            </div>

            <div>
                <label className="pr-2">
                    <input type="radio" name="method" value={method} checked={method === MugshotMethod.URL} onChange={(_) => handleMethodChange(MugshotMethod.URL)} className="mr-1" />
                    URL
                    </label>
                <input type="text" disabled={method !== MugshotMethod.URL} onChange={handleUrlChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            </div>



            <div>
                <label className="pr-2">
                    <input type="radio" name="method" value={method} checked={method === MugshotMethod.File} onChange={(_) => handleMethodChange(MugshotMethod.File)} className="mr-1" />
                    File
                    </label>
                <input type="file" disabled={method !== MugshotMethod.File} onChange={handleFileChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            </div>
        </div>
    )
}

const Form: React.FC<FormProps> = ({ headline, pundit, onHeadlineChange, onPunditChange, onMugshotChange }: FormProps) => {
    const handleHeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onHeadlineChange(e.target.value);
    };

    const handlePunditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onPunditChange(e.target.value);
    }

    return (
        <form className=" border-t border-b lg:border-l lg:border-r px-4 p-4 my-4 text-lg">
            <h2 className="font-bold mb-1">Headline</h2>
            <input type="text" value={headline} onChange={handleHeadlineChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            <br />
            <h2 className="font-bold mt-4 mb-1">Pundit Name</h2>
            <input type="text" value={pundit} onChange={handlePunditChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            <h2 className="font-bold mt-4 mb-1">Pundit Mugshot</h2>
            <PunditMugshotInput onMugshotChange={onMugshotChange} />
        </form>
    )
}

export default Form