import { Icon } from 'monday-ui-react-core'
import { Code, CreditCard, Gantt, Connect } from 'monday-ui-react-core/icons'

export function Templates() {
return <section className='templates-container flex'>

<div className="template-picker dev"><div><Icon iconType={Icon.type.SVG} icon={Code} iconSize={40} /></div> Software Development</div>
<div className="template-picker marketing"><div><Icon iconType={Icon.type.SVG} icon={CreditCard} iconSize={40} /></div> Marketing</div>
<div className="template-picker PRM"><div><Icon iconType={Icon.type.SVG} icon={Gantt} iconSize={40} /></div> Project Managment</div>
<div className="template-picker CRM"><div><Icon iconType={Icon.type.SVG} icon={Connect} iconSize={25} /></div> Sales & CRM</div>

</section>
}