import getTikTokProfileBio from "./getBio";
import getTikTokLikesCount from "./getLikes";
import getTikTokProfileLinkedURL from "./getProfileURL";
import getTikTokFollowersCount from "./getFollowers";
import getTikTokFollowing from "./getFollowing";

/**
 * Returns all information of a user (Request can take up to 2 Minutes and 30 Seconds)
 * @param user The tiktok username
 * @returns {JSON} Raw data of the TikTok User
 */
export default async function getTikTokAll (user: string) {
    const bio = await getTikTokProfileBio(user);
    const likes = await getTikTokLikesCount(user);
    const linkedURL = await getTikTokProfileLinkedURL(user);
    const followers = await getTikTokFollowersCount(user);
    const following = await getTikTokFollowing(user);

    return {
        "username": user,
        "bio": bio,
        "likes": likes,
        "linkedURL": linkedURL,
        "followers": followers,
        "following": following
    }
}