import ArticleCard from "@/components/ArticleCard";

const Home = () => {
    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems: 'center'}}>
        <ArticleCard article={{
            id: "1",
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            description: "Desccccccc",
            content: "contttttttttt",
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