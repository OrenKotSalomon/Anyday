import { useState } from "react"

export function DynamicModal({ cmp, setIsModalOpen }) {
    console.log(cmp);
    switch (cmp.type) {

        case 'status-picker':
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ left: '600px', top: '200px', position: 'absolute', }}>

                <div className="status-picker-view">
                    {cmp.statuses.map((status, idx) => {
                        return <button key={idx}
                            style={{ background: status.bgColor }}
                            className="status-picker">
                            {status.label}
                        </button>
                    }
                    )}
                </div>
            </div>
        case 'member-picker':
            return
        case 'date-picker':
            return
    }
}