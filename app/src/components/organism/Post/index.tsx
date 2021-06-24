import React, { useState } from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    Container,
    Avatar,
    HStack,
    Text,
    Divider,
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';

import './Post.scss';
import { useEffect } from 'react';

interface Props {
    post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
    const [showMore, setShowMore] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const title = post.title || new Date(Number(post.date)).toLocaleDateString();
    let info = 'Group Schedule';
    if (post.TTL) info = new Date(Number(post.TTL)).toLocaleDateString();
    if (post.isDraft) info = 'Draft';
    const ID = uuid();

    useEffect(() => {
        const height = document.getElementById(ID)?.clientHeight;
        if (height === 120) {
            setShowMore(true);
        }
    }, [post.content.text]);

    return (
        <Container
            height={expanded ? undefined : '230px'}
            bg={useColorModeValue('white', 'dark.900')}
            className="Post"
            width="100vw"
        >
            <HStack justifyContent="space-evenly" margin="5px 0 5px 0">
                <Avatar
                    className="groupAvatar"
                    size="lg"
                    bg={post.group?.colour ? `#${post.group?.colour}` : 'black'}
                    color={'white'}
                    name={post.group?.groupName || 'Schedule'}
                    getInitials={name => {
                        if (name.length <= 10) return name;
                        const mid = Math.floor(name.length / 2);
                        const before = name.lastIndexOf(' ', mid);
                        const after = name.indexOf(' ', mid + 1);
                        if (before > 10 || after > 10) {
                            return [name.substr(0, mid), name.substr(mid)].join(' ');
                        }
                        return name;
                    }}
                />
                <Heading as="h4" size="md" width="180px">
                    {title}
                </Heading>
                <Text fontSize="md" width="85px" textAlign="end">
                    {info}
                </Text>
            </HStack>
            <hr style={{ height: '1px', border: 'none', 'background-color': '#ccc' }} />

            <Text
                id={ID}
                style={{ 'white-space': 'pre-wrap' }}
                fontSize="md"
                fontFamily="roboto"
                noOfLines={expanded ? undefined : 5}
                maxWidth="465px"
            >
                {post.content.text}
            </Text>
            {showMore ? (
                <Text
                    onClick={() => {
                        setExpanded(true);
                        setShowMore(false);
                    }}
                >
                    See More...
                </Text>
            ) : null}
        </Container>
    );
};

export default Post;
