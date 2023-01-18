import { Button, Flex, SplitButton, AvatarGroup, Avatar, Icon } from 'monday-ui-react-core'
import { Add, Search, Person, Filter, Sort } from "monday-ui-react-core/icons";
import { useMemo } from 'react';

export function BoardFilter() {

    function temp() {

    }

    return <section className='board-filter'>
        <Flex >

            <SplitButton leftIcon={Add} size={Button.sizes.SMALL}  >
                Left icon
            </SplitButton>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Search}>
                Search
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Person}>
                Person
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Filter}>
                Filter
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Sort}>
                Sort
            </Button>
        </Flex>
    </section>

}