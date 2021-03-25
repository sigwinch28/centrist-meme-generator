import React, { useEffect, useReducer } from 'react';
import pepe from './images/pepe.png';

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
    Pepe,
    URL
}

type Action =
    | { kind: "changeMethod", method: MugshotMethod }
    | { kind: "changeFile", file: string }
    | { kind: "changeUrl", url: string}

const PunditMugshotInput: React.FC<PunditMugshotInputProps> = ({ onMugshotChange }: PunditMugshotInputProps) => {

    interface State {
        method: MugshotMethod,
        file: string,
        url: string
    }

    const initialState : State = {
        method: MugshotMethod.Pepe,
        file: "",
        url: "" 
    }

    const reducer = (state : State, action : Action) : State => {
        switch (action.kind) {
            case "changeMethod":
                return {...state, method: action.method};
            case "changeFile":
                return {...state, file: action.file};
            case "changeUrl":
                return {...state, url: action.url};
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        switch (state.method) {
            case MugshotMethod.None:
                onMugshotChange("");
                break;
            case MugshotMethod.Pepe:
                onMugshotChange(pepe);
                break;
            case MugshotMethod.File:
                onMugshotChange(state.file);
                break;
            case MugshotMethod.URL:
                onMugshotChange(state.url);
                break;
        }
    }, [state, onMugshotChange]);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({kind: 'changeUrl', url: e.target.value})
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files?.[0];
        if (file) {
            let url = URL.createObjectURL(file);
            dispatch({kind: 'changeFile', file: url});
        }
        
    }

    const radioButton = (method: MugshotMethod) =>
        <input type="radio" name="method" value={method} checked={state.method === method} onChange={(_) => dispatch({kind: "changeMethod", method: method})} className="mr-1" />

    return (
        <div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotMethod.None)}
                    None
                    </label>
            </div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotMethod.Pepe)}
                    Sad pepe
                    </label>
            </div>

            <div>
                <label className="pr-2">
                    {radioButton(MugshotMethod.URL)}
                    URL
                    </label>
                <input type="text" disabled={state.method !== MugshotMethod.URL} onChange={handleUrlChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
            </div>



            <div>
                <label className="pr-2">
                    {radioButton(MugshotMethod.File)}
                    File
                    </label>
                <input type="file" disabled={state.method !== MugshotMethod.File} onChange={handleFileChange} className="border-2 border-gray-400 p-2 focus:ring-4" />
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