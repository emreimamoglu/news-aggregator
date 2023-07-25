import ArticleCard from "@/components/ArticleCard";
import ArticleReader from "@/components/ArticleReader";

const Home = () => {
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems: 'center'}}>
        <ArticleReader article={{
            id: "1",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            description: "Desccccccc",
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias id eligendi nemo dolorum voluptatibus ratione, omnis veritatis sunt dolor beatae harum esse quibusdam earum, sequi cumque quasi tempore numquam consequuntur iusto itaque veniam eveniet explicabo ex. Ad excepturi eum dolorum ab nihil sapiente sed, enim provident. Quisquam, libero. Quas quae dolore reprehenderit. Quia impedit provident odio, odit repudiandae quos alias eum ab non voluptatem, necessitatibus culpa similique asperiores assumenda corrupti magni. Neque, eius expedita odit non, vero, sit et dolores eveniet ipsum dignissimos reiciendis est minus quia alias obcaecati vel odio maxime asperiores suscipit minima ad iure veniam dicta. Neque! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias id eligendi nemo dolorum voluptatibus ratione, omnis veritatis sunt dolor beatae harum esse quibusdam earum, sequi cumque quasi tempore numquam consequuntur iusto itaque veniam eveniet explicabo ex. Ad excepturi eum dolorum ab nihil sapiente sed, enim provident. Quisquam, libero. Quas quae dolore reprehenderit. Quia impedit provident odio, odit repudiandae quos alias eum ab non voluptatem, necessitatibus culpa similique asperiores assumenda corrupti magni. Neque, eius expedita odit non, vero, sit et dolores eveniet ipsum dignissimos reiciendis est minus quia alias obcaecati vel odio maxime asperiores suscipit minima ad iure veniam dicta. Neque!",
            author: "Authoooooooor",
            category: "Cateeeeeeeeeeeegory",
            source: "Source",
            url: "",
            imate_url: "https://trendjackers.com/wp-content/uploads/2017/01/People-Per-Hour-How-To-Succeed-As-A-New-Freelancer.jpg",
            published_at: "2023-07-24"
        }}/>
        </div>
    )
};


export default Home;