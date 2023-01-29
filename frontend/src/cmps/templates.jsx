import { useNavigate } from 'react-router-dom'

import { boardService } from "../services/board.service.local"
import { addBoard } from '../store/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { Icon } from 'monday-ui-react-core'
import { Code, CreditCard, Gantt, Connect } from 'monday-ui-react-core/icons'

export function Templates() {

    const navigate = useNavigate()

    async function onTemplateSelect(boardType) {
        let boardToAdd
        switch (boardType) {
            case 'dev board': boardToAdd = boardService.getDevTemplate()
            case 'marketing board': boardToAdd = boardService.getMarketingTemplate()
            case 'PRM board': boardToAdd = boardService.getPRMTemplate()
            case 'CRM board': boardToAdd = boardService.getCRMTemplate()
            // default: boardToAdd = boardService.getDevTemplate()
            //     break
        }
        try {
            const savedBoard = await addBoard(boardToAdd)
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot Add Template', err)
        }
    }

    return <section className='templates-container flex'>

        <div className="template-picker dev"
            onClick={() => onTemplateSelect('dev board')} >
            <div><Icon iconType={Icon.type.SVG} icon={Code} iconSize={40} /></div> Software Development</div>
        <div className="template-picker marketing"
            onClick={() => onTemplateSelect('marketing board')} >
            <div><Icon iconType={Icon.type.SVG} icon={CreditCard} iconSize={40} /></div> Marketing</div>
        <div className="template-picker PRM"
            onClick={() => onTemplateSelect('PRM board')} >
            <div><Icon iconType={Icon.type.SVG} icon={Gantt} iconSize={40} /></div> Project Managment</div>
        <div className="template-picker CRM"
            onClick={() => onTemplateSelect('CRM board')} >
            <div><Icon iconType={Icon.type.SVG} icon={Connect} iconSize={25} /></div> Sales & CRM</div>

    </section>
}