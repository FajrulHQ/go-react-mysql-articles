import { Button, Tag } from "antd";
import { ArrowLeftCircle, Monitor } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { decode_ } from "../../../routes/utils";
import { useMutation, useQuery } from "react-query";
import APIRequest from "../../../api/request";
import { useArticleStore } from "../../../store/article";
import { useEffect } from "react";
import moment from 'moment'

export default function ArticlePreviewDetail() {
  const navigate = useNavigate()
  const { article, setArticle } = useArticleStore()
  const { id: encode_id } = useParams()
  const id_ = decode_(encode_id || '')
  const { mutate: onGetDetailArticle } = useMutation(async () => {
    const { data } = await APIRequest({
      method: 'GET',
      path: '/articles/' + id_,
    })
    return data
  }, {
    onSuccess: data => setArticle(data)
  })
  useEffect(() => {
    if (id_) onGetDetailArticle()
  }, [id_]);

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex justify-between items-center bg-white shadow-sm">
        <ArrowLeftCircle className="cursor-pointer text-primary hover:text-primary/70 ml-2" onClick={() => navigate('/preview')} />
        <Button onClick={() => navigate('/')} type="text" size="large"><Monitor className="h-4 w-4" />All Article</Button>
      </div>
      {article.id ? (
        <div className="flex justify-center mt-8">
          <div className="max-w-[40rem] space-y-4 py-4">
            <p>{moment(article.created_at || '').format('MMMM Do YYYY, h:mm:ss a')}</p>
            <p className="text-4xl font-medium">{article.title}</p>
            {article.category && article.category.split(',').map((item: string, i: number) => <Tag color="black" key={i}>{item}</Tag>)}
            <p className="pt-4">{article.content}</p>
          </div>
        </div>
      ) : (
        <div className="py-64 items-center justify-center flex">
          <p className="text-9xl text-gray-200 font-bold">404</p>
          <p className="fixed text-xl font-medium mt-10">Not Found</p>
        </div>
      )}
    </div>
  )
}
