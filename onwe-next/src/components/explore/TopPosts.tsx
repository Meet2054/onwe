import React, { useEffect, useState } from "react";
import Post from "./Post"; // Assuming Club component is in the same directory
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";

interface Post {
  id: string;
  media: string[];
}
const TopPosts: React.FC = () => {
  // const topPosts = [
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/5d69/a9f9/3952b88d5fd84f90a556f47763842415?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abdt0iQ1BwrJO~29HFysbTIKIxnN2QbX6-4cYTsH2X24R~AioTTO~JN4ncH2ctSUwyOXjiXvftampp~6XZQ4xEGxCf5I2-uKMIGyNposihDY8twKaj9rBUY-9GNYgsVAYxIQFNewqnNqvlS6jlkNQzenF0WXZ0rXLS657xtQUWB0iICTbLM1lIbTPKNM6g70lYow0FVaGrSQfMZEMR28QuU858VdqQVoq-L8zEOj0CpBYEsY5LZl4OpEJKxjjwDjd0qdFfvYghNZYfQvl3dPx3narMoV1dJTNyanc-dZ~OV4MjFSVSGN-Zt5rk4RE5fdBzpEwlizBiJqpF-ibeNoxg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/50d5/b9fa/cde50cbe3fd41599de80119dedae4570?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZA~nwvpAnPQ34TUnyZst3-y4A~SA5fhru2TqnEELoQqe42WVl5BIWQeBxf24QlhC9~JmHYSk6xle~b3gOGIM7r1duMYYx9z34xWvijxOtjGxndfI5lDOcfWCZd-uxkTvYUUhBeCEREtdGzUcEjpWtPCFPJumHq8F~z7Ua0uqFb4ucQIkBy15WocP~8cNMe2AUF-xulQgwVNofzTD1ZiTUwbeemtVDMIsX0mFoP0UiEtjv56fnm4nP5lI~xE~WtMwp6xq2oxAamm2AFcVkAOEJOBg3yxPUGEYM8rzE8MuOCsfHVcuqtWjV-P-PKPZ-beAuXngPcMkrFRANkLHxFSbqQ__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/d42d/c033/76cb041dbfea4d64aa1081a923436433?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PlKHaKeZH2wzqj6rIu5k15EzuY9sdZLvgFEx7l8OZepE5kFmJj76KisN~8XoH5db8v-XWx0KbYj5SXXUgjb-9vmNn5b7Gp7BtuWfL5e-58YNe1mD8nhgRsbo9Cg3gga56daGovBsakWRLcEnVglSrQfJte9DUK1C-YVHK8HX1-A4Q7qhIssdXwFBisORxRXQxktMs3Ya4~GldZEkDNwC7V5TZ7xKl1qxMZI0yeikM8fJspnA-MU9ldCFQKNsqtsNHCKuf63RNnlJ5OnH-hquyGqaZ0NgWvol1aLO5B9Gz9jQxMD0~YYe2awa5bW9zWKDhEc4ZeQOT4ZHQ94cuquxnw__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/9844/1699/fe650196bc5b5e10e697b8e5c1a2c6a7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TIZiATfiCamhS-QjhktWP7kjhK5qB54AAC040tr~38AolV8ZWNp1CnxnnjDcID~wX~QgvRi8p6AMHb~qWA3TpAlkovF1KfCc~EgYzT4J4gUU5XcQuBn87apb~8SUHivenxHmxLQSk2FxxxmQH9x4~~uVZrS5a9c8UY02NTd-8nJCMPbEjkPpqBnDm~OcWRkmNM32MBehT~3CwldomoLtz79AaFDefLSr2iIlr2bFL~ggC8cqltIBQKh4Tx5RQPWN3QnZEavh-eKqZvcKk-lHewgxYDVd2YaJVwD0zNtTtfTGD1Tfn-6bYrlkjRV-Pc-VyeGYriy3KXKQ-3ZjQHsIBQ__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/d42d/c033/76cb041dbfea4d64aa1081a923436433?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PlKHaKeZH2wzqj6rIu5k15EzuY9sdZLvgFEx7l8OZepE5kFmJj76KisN~8XoH5db8v-XWx0KbYj5SXXUgjb-9vmNn5b7Gp7BtuWfL5e-58YNe1mD8nhgRsbo9Cg3gga56daGovBsakWRLcEnVglSrQfJte9DUK1C-YVHK8HX1-A4Q7qhIssdXwFBisORxRXQxktMs3Ya4~GldZEkDNwC7V5TZ7xKl1qxMZI0yeikM8fJspnA-MU9ldCFQKNsqtsNHCKuf63RNnlJ5OnH-hquyGqaZ0NgWvol1aLO5B9Gz9jQxMD0~YYe2awa5bW9zWKDhEc4ZeQOT4ZHQ94cuquxnw__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/9844/1699/fe650196bc5b5e10e697b8e5c1a2c6a7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TIZiATfiCamhS-QjhktWP7kjhK5qB54AAC040tr~38AolV8ZWNp1CnxnnjDcID~wX~QgvRi8p6AMHb~qWA3TpAlkovF1KfCc~EgYzT4J4gUU5XcQuBn87apb~8SUHivenxHmxLQSk2FxxxmQH9x4~~uVZrS5a9c8UY02NTd-8nJCMPbEjkPpqBnDm~OcWRkmNM32MBehT~3CwldomoLtz79AaFDefLSr2iIlr2bFL~ggC8cqltIBQKh4Tx5RQPWN3QnZEavh-eKqZvcKk-lHewgxYDVd2YaJVwD0zNtTtfTGD1Tfn-6bYrlkjRV-Pc-VyeGYriy3KXKQ-3ZjQHsIBQ__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/d42d/c033/76cb041dbfea4d64aa1081a923436433?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PlKHaKeZH2wzqj6rIu5k15EzuY9sdZLvgFEx7l8OZepE5kFmJj76KisN~8XoH5db8v-XWx0KbYj5SXXUgjb-9vmNn5b7Gp7BtuWfL5e-58YNe1mD8nhgRsbo9Cg3gga56daGovBsakWRLcEnVglSrQfJte9DUK1C-YVHK8HX1-A4Q7qhIssdXwFBisORxRXQxktMs3Ya4~GldZEkDNwC7V5TZ7xKl1qxMZI0yeikM8fJspnA-MU9ldCFQKNsqtsNHCKuf63RNnlJ5OnH-hquyGqaZ0NgWvol1aLO5B9Gz9jQxMD0~YYe2awa5bW9zWKDhEc4ZeQOT4ZHQ94cuquxnw__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/9844/1699/fe650196bc5b5e10e697b8e5c1a2c6a7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TIZiATfiCamhS-QjhktWP7kjhK5qB54AAC040tr~38AolV8ZWNp1CnxnnjDcID~wX~QgvRi8p6AMHb~qWA3TpAlkovF1KfCc~EgYzT4J4gUU5XcQuBn87apb~8SUHivenxHmxLQSk2FxxxmQH9x4~~uVZrS5a9c8UY02NTd-8nJCMPbEjkPpqBnDm~OcWRkmNM32MBehT~3CwldomoLtz79AaFDefLSr2iIlr2bFL~ggC8cqltIBQKh4Tx5RQPWN3QnZEavh-eKqZvcKk-lHewgxYDVd2YaJVwD0zNtTtfTGD1Tfn-6bYrlkjRV-Pc-VyeGYriy3KXKQ-3ZjQHsIBQ__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/5d69/a9f9/3952b88d5fd84f90a556f47763842415?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=abdt0iQ1BwrJO~29HFysbTIKIxnN2QbX6-4cYTsH2X24R~AioTTO~JN4ncH2ctSUwyOXjiXvftampp~6XZQ4xEGxCf5I2-uKMIGyNposihDY8twKaj9rBUY-9GNYgsVAYxIQFNewqnNqvlS6jlkNQzenF0WXZ0rXLS657xtQUWB0iICTbLM1lIbTPKNM6g70lYow0FVaGrSQfMZEMR28QuU858VdqQVoq-L8zEOj0CpBYEsY5LZl4OpEJKxjjwDjd0qdFfvYghNZYfQvl3dPx3narMoV1dJTNyanc-dZ~OV4MjFSVSGN-Zt5rk4RE5fdBzpEwlizBiJqpF-ibeNoxg__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/50d5/b9fa/cde50cbe3fd41599de80119dedae4570?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZA~nwvpAnPQ34TUnyZst3-y4A~SA5fhru2TqnEELoQqe42WVl5BIWQeBxf24QlhC9~JmHYSk6xle~b3gOGIM7r1duMYYx9z34xWvijxOtjGxndfI5lDOcfWCZd-uxkTvYUUhBeCEREtdGzUcEjpWtPCFPJumHq8F~z7Ua0uqFb4ucQIkBy15WocP~8cNMe2AUF-xulQgwVNofzTD1ZiTUwbeemtVDMIsX0mFoP0UiEtjv56fnm4nP5lI~xE~WtMwp6xq2oxAamm2AFcVkAOEJOBg3yxPUGEYM8rzE8MuOCsfHVcuqtWjV-P-PKPZ-beAuXngPcMkrFRANkLHxFSbqQ__",
  //   },
  //   {
  //     coverImage:
  //       "https://s3-alpha-sig.figma.com/img/1d84/a113/5297444437a9094b28ba5a7719b140b1?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K7JczNOw2pnT8IXpiEs3Z~~M0dwvJK-CJ-UdmXFYI106R-nmRJaU6azB-tmn327SYniH7WfSdHjswDb4seSuxWVdYgIj461v4bTJu7CSB8wW6VtnuLbuSi2-CSq8W7RsajO9YMQCXsepTS7OIVmyn7Y95Z5DaY-oxAvxn7vibP9XIRkbil8KNYkKgERk~9b35oMQ5nwdF3jgcMtny3KFM~iMzIPi4XnXoJk~tV1A-T7y-CV0eLMxpI7gaThc~azVZEXmG6zTjj8uEAd3l4zq1J9hnA-8DCcLaZYK2AZkFfg-7-Tzy~m7XQW~xOQIZnKW8Y0Eq9PxqiUa1Yw7xLfRFg__",
  //   },
  // ];
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>();
  const { getToken } = useAuth();

  const handleClick = (post: any) => {
    dispatch(setPost(post));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/top-posts`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [getToken]);
  return (
    <div className="w-full p-4  h-full]">
      <div className="px-5 h-full ">
        <div className="gap-1 grid grid-cols-4 h-full">
          {posts?.map((post) => (
            <div onClick={() => handleClick(post)} key={post.id}>
              <DialogBox className={""} imageUrl={post.media[0]} post={post} />
            </div>
            // <Post key={inex} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPosts;
