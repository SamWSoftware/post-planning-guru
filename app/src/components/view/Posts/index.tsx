import React, { useEffect, useState } from 'react';
import {
    Button,
    ButtonGroup,
    VStack,
    Grid,
    Center,
    useColorModeValue,
    Heading,
    Container,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import Post from '../../organism/Post';
import { getPostsForCompany } from '../../../graphql/queries';
import { API } from 'aws-amplify';
import { useContext } from 'react';
import { CompanyContext } from '../../../context/companyContext';

interface Props {}

const Posts: React.FC<Props> = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [nextToken, setNextToken] = useState<string | undefined>(undefined);
    const { selectedCompany } = useContext(CompanyContext);

    useEffect(() => {
        getPostPage();
    }, [selectedCompany]);

    const getPostPage = async () => {
        console.log('selectedCompany', selectedCompany);
        if (!selectedCompany) return;

        const res = await API.graphql<{
            getPostsForCompany: { posts: IPost[]; nextToken: string };
        }>({
            query: getPostsForCompany,
            variables: {
                companyID: selectedCompany?.companyID,
                nextToken,
            },
        });
        if (res.data) {
            const newPosts = res.data!.getPostsForCompany.posts;
            setPosts([...posts, ...newPosts]);
            setNextToken(res.data!.getPostsForCompany.nextToken || undefined);
        } else {
            console.log('error of', res.errors);
        }
    };

    return (
        <Grid minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Container
                paddingTop="30px"
                marginBottom="10px"
                height="90px"
                background={useColorModeValue('white', 'dark.900')}
            >
                <Heading marginTop="20px">Posts</Heading>
            </Container>
            <VStack>
                {posts.map(post => (
                    <Post post={post} />
                ))}
            </VStack>
        </Grid>
    );
};

export default Posts;
