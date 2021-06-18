import DynamoUtils from '@libs/dynamoDB';
import { AppSyncResolverEvent } from 'aws-lambda';

interface UpdatePostArguments {
    postID: string;
    contentText: string;
    newGroupID?: string;
    publishTime?: Long;
    title?: string;
    draft?: Boolean;
}

interface Post {
    postID: string;
    companyID: string;
    date: number;
    groupID: string;
    isDraft: boolean;
    title: string;
    content: {
        text?: string;
    };
    TTL: number;
}
let errorMessage = '';

const handler = async (event: AppSyncResolverEvent<UpdatePostArguments>) => {
    errorMessage = '';
    const { postID, contentText, newGroupID, publishTime, draft, title } = event.arguments;
    try {
        if (!postID) {
            errorMessage = 'postID needs to be provided';
            throw Error(errorMessage);
        }

        if (!contentText && !newGroupID && !publishTime && !draft && !title) {
            errorMessage = 'a field to update needs to be provided';
            throw Error(errorMessage);
        }
        const params = {
            hashKey: 'postID',
            hashValue: postID,
            tableName: process.env.PostsTable,
        };
        console.log('params', params);
        const post = await DynamoUtils.get<Post>(params);

        if (!post) {
            errorMessage = 'Unable to get the original post';
            throw Error(errorMessage);
        }

        const updatedContent = {
            text: contentText || post.content.text,
        };

        const updatedPost = {
            ...post,
            groupID: newGroupID || post.groupID,
            TTL: publishTime ? Number(publishTime) : post.TTL,
            isDraft: draft !== undefined ? draft : post.isDraft,
            content: updatedContent,
            title: title || post.title,
        };

        await DynamoUtils.write({ data: updatedPost, tableName: process.env.PostsTable });

        return updatedPost;
    } catch (error) {
        console.log('error', error);
        throw Error(errorMessage || 'Unable to update the post');
    }
};
exports.handler = handler;
export default handler;
