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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Input,
    Textarea,
    Box,
    Text,
    MenuGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../../atom/ColorModeSwitcher';
import { API, toast } from 'aws-amplify';
import graphql from '../../../graphql';
import { useContext } from 'react';
import { CompanyContext } from '../../../context/companyContext';
import { CreatePost, UpdatePostI } from '../../../graphql/mutations';
import { useEffect } from 'react';
import { GetPostResponseI } from '../../../graphql/queries';
import { useParams } from 'react-router-dom';

interface Props {
    create?: boolean;
}

interface PostConfig {
    postID?: string;
    type?: 'group' | 'scheduled';
    group?: string;
    schedule?: string;
}

const EditPost: React.FC<Props> = ({ create }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [postConfig, setPostConfig] = useState<PostConfig>({});
    const [datepickerOpen, setDatepickerOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const { postID } = useParams<{ postID?: string }>();

    const toast = useToast();

    const { selectedCompany } = useContext(CompanyContext);

    const groups: {
        [key: string]: {
            colour: string;
            name: string;
            groupID: string;
        };
    } = {};

    useEffect(() => {
        if (!postID) return;
        console.log('postID', postID);
        getPostForUpdate(postID);
    }, [postID]);
    useEffect(() => {
        console.log('selectedCompany in edit post', selectedCompany);
        selectedCompany?.groups.forEach(({ groupID, groupName, colour }) => {
            groups[groupID] = {
                groupID,
                colour,
                name: groupName,
            };
        });
    }, [selectedCompany]);

    const getPostForUpdate = async (postID: string) => {
        try {
            const res = await API.graphql<{ getPost: GetPostResponseI }>({
                query: graphql.queries.getPost,
                variables: {
                    postID,
                },
            });
            const {
                group,
                TTL,
                content: { text },
                title,
            } = res.data?.getPost as GetPostResponseI;
            setPostConfig({
                postID,
                type: TTL ? 'scheduled' : group?.groupID ? 'group' : undefined,
                group: group?.groupID ?? undefined,
                schedule: TTL ? new Date(TTL * 1000).toISOString() : undefined,
            });
            setText(text);
            setTitle(title || '');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Unable to open the post for editing',
                status: 'error',
                isClosable: true,
            });
        }
    };

    const savePost = async ({ draft }: { draft?: boolean }) => {
        setSaving(true);
        try {
            console.log(selectedCompany);
            if (!selectedCompany?.companyID) {
                throw { title: 'No Profile is Selected' };
            }
            if (postConfig.postID) {
                const variables: UpdatePostI = {
                    postID: postConfig.postID,
                    contentText: text,
                    title,
                    newGroupID: postConfig.group,
                    publishTime: postConfig.schedule
                        ? new Date(postConfig.schedule).getTime() / 1000
                        : undefined,
                    draft,
                };
                // validate the post
                validateUpdatePost(variables);

                await API.graphql({
                    query: graphql.mutations.updatePost,
                    variables,
                });
            }
            if (create) {
                const variables: CreatePost = {
                    companyID: selectedCompany?.companyID,
                    contentText: text,
                    title,
                    groupID: postConfig.group,
                    publishTime: postConfig.schedule
                        ? new Date(postConfig.schedule).getTime() / 1000
                        : undefined,
                    isDraft: draft,
                };
                // validate the post
                validatePost(variables);

                await API.graphql({
                    query: graphql.mutations.createPost,
                    variables,
                });
            }
        } catch (error) {
            let defaultTitle = 'There was an error saving your post';
            if (error.title) {
                defaultTitle = error.title;
            } else {
                console.error('error saving post', error);
            }

            toast({
                title: defaultTitle,
                status: 'error',
                isClosable: true,
            });
        }
    };

    const validatePost = ({ companyID, contentText, groupID, publishTime }: CreatePost) => {
        if (!companyID) throw { title: 'No Profile is Selected' };
        if (!contentText) throw { title: 'Please type your post' };
        if (!groupID && !publishTime) throw { title: 'A group or a schedule is required' };
    };

    const validateUpdatePost = ({ postID, contentText, newGroupID, publishTime }: UpdatePostI) => {
        if (!postID) throw { title: 'No postID to update' };
        if (
            typeof postID !== 'string' ||
            !postID.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g)
        ) {
            return { title: 'postID is invalid' };
        }
    };

    const PostTypeMenuOptions = () => {
        if (postConfig.type === 'group') {
            return (
                <MenuList>
                    <MenuGroup
                        title={Object.keys(groups).length > 0 ? 'Choose Group' : 'No Groups'}
                    >
                        <MenuItem
                            onClick={() =>
                                setPostConfig({ ...postConfig, type: undefined, group: undefined })
                            }
                        >
                            Back
                        </MenuItem>
                        {Object.entries(groups).map(([groupID, group]) => (
                            <MenuItem
                                onClick={() => setPostConfig({ ...postConfig, group: groupID })}
                            >
                                {group.name}
                            </MenuItem>
                        ))}
                    </MenuGroup>
                </MenuList>
            );
        }
        if (postConfig.type === 'scheduled') {
            return (
                <MenuList>
                    {postConfig.schedule ? (
                        <MenuGroup
                            title={new Date(postConfig.schedule).toLocaleString()}
                        ></MenuGroup>
                    ) : null}
                    <MenuItem onClick={() => setDatepickerOpen(true)}>Select Date</MenuItem>
                    <MenuItem
                        onClick={() =>
                            setPostConfig({ ...postConfig, type: undefined, schedule: undefined })
                        }
                    >
                        Back
                    </MenuItem>
                </MenuList>
            );
        }

        return (
            <MenuList>
                <MenuGroup title="Choose Post Type">
                    <MenuItem
                        onClick={() => setPostConfig({ ...postConfig, type: 'group' })}
                        closeOnSelect={false}
                    >
                        Group Post
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setPostConfig({ ...postConfig, type: 'scheduled' });
                            setDatepickerOpen(true);
                        }}
                        closeOnSelect={false}
                    >
                        Schedule Post
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        );
    };

    const PostTypeValue = () => {
        if (postConfig.group) {
            console.log('groupID', postConfig.group);
            console.log(groups[postConfig.group]);
            return groups[postConfig.group].name;
        }
        if (postConfig.schedule) {
            return new Date(postConfig.schedule).toLocaleDateString().slice(0, 5);
        }

        return postConfig.type || 'Type';
    };

    return (
        <Box minH="100vh" bg={useColorModeValue('light.200', 'dark.700')}>
            <Container
                paddingTop="30px"
                marginBottom="10px"
                height="90px"
                background={useColorModeValue('white', 'dark.900')}
                display="flex"
                justifyContent="space-between"
            >
                <Heading width="200px" marginTop="20px">
                    {create ? 'Create' : 'Edit'} Post
                </Heading>
                <Menu matchWidth>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Save
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => savePost({})}>Save</MenuItem>
                        <MenuItem
                            onClick={() => {
                                savePost({ draft: true });
                            }}
                        >
                            Draft
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Container>
            <VStack p={5} bg={useColorModeValue('white', 'dark.900')}>
                <Box width="100%" display="flex" justifyContent="space-between">
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        variant="flushed"
                        placeholder="Post Title (optional)"
                    />
                    <Menu>
                        <MenuButton minWidth="100px" as={Button} rightIcon={<ChevronDownIcon />}>
                            {PostTypeValue()}
                        </MenuButton>
                        {PostTypeMenuOptions()}
                    </Menu>
                </Box>
                <hr />
                <Textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type your post here"
                />
                <Text color={text.length > 3000 ? 'red' : 'black'}>{text.length}/3000</Text>
            </VStack>

            <Modal isOpen={datepickerOpen} onClose={() => setDatepickerOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column">
                        <input
                            style={{ marginBottom: '-75px', paddingBottom: '75px' }}
                            type="datetime-local"
                            value={postConfig.schedule || new Date().toISOString()}
                            onChange={e => {
                                console.log('new time', e.target.value);
                                setPostConfig({
                                    ...postConfig,
                                    schedule: e.target.value,
                                });
                            }}
                            min={new Date().toISOString()}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => setDatepickerOpen(false)}>
                            OK
                        </Button>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                setPostConfig({ ...postConfig, schedule: undefined });
                                setDatepickerOpen(false);
                            }}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default EditPost;
