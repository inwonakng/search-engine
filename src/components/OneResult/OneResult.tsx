import React from 'react';
import './OneResult.css'
import { Typography } from 'antd'
import { Link } from 'react-router-dom';

const { Text,Title } = Typography

// declare prop types here
export type Props = {
	title?: string;
    body?: string;
    url?: string;
    idx?: number;
};

const OneResult: React.FC<Props> = ({
	title = 'Missing title',
    body = 'Missing body',
    url = '',
    idx = -1
}) => {


	const inputprops = {}
	return (
		<div className='OneResult'>
            <div className='title-and-link'>
                <Title level={3} className='resultTitle'>{title.slice(0,40)}</Title>
                <Link className='resultLink' to={url}>
                    <Text underline={true} style={{color:'#1890ff'}}>
                    {url.slice(0,50)}
                    </Text>
                </Link>
            </div>
            <Text>{body.slice(0,500)}</Text>
		</div>
	)
}


export default OneResult