import { memo } from 'react'

interface InputField {
    label?: string,
    placeholder: string,
    rows?: number,
    input?: boolean,
    type?: string,
    options?: any[],
    labelClass: string,
    frmField: any,
    err: any,
    gap?: number,
    id: string,
    errMessage: any,
    noneLabel?: boolean

}
function InputAdmin(props: InputField) {
    const classInput = `form-control inputSearch ${props.err ? "is-invalid" : ""}`
    return (
        <>
            <div className={`row ${props.gap ? `g-${props.gap}` : ''} w-100 align-items-center ${!props.noneLabel && 'mb-3 g-1'}`}>
                {!props.noneLabel &&
                    <div className={props.labelClass}>
                        <label htmlFor={props.id} className="mb-0 fs-6">{props?.label}</label>
                    </div>
                }
                <div className="col-md">
                    {props?.rows &&
                        <textarea
                            id={props.id}
                            placeholder={props.placeholder}
                            className={classInput}
                            {...props.frmField}

                            rows={props.rows}
                        >

                        </textarea>
                    }
                    {props?.input &&
                        <input
                            id={props.id}
                            type = {props?.type}
                            placeholder={props.placeholder}
                            className={classInput}
                            {...props.frmField}
                        />
                    }
                    {props?.options &&
                        <select
                            id={props.id}
                            className={`${classInput} form-select`}
                            {...props.frmField}
                        >
                            <option value="" hidden>{props.placeholder}</option>
                            {props?.options.map((option, index) => <option key={index} value={option.value}>{option.name}</option>)}
                        </select>
                    }
                    {props.err ? <div className="invalid-feedback">{props.errMessage}</div> : ""}
                </div>
            </div>
        </>
    );
}

export default memo(InputAdmin);