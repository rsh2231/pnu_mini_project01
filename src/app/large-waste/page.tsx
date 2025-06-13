import React from "react";

export default function LargeWastePage() {
  const appliances = [
    { name: "냉장고", specs: "1,000ℓ 이상", fee: "20000" },
    { name: "냉장고", specs: "500ℓ 이상", fee: "18000" },
    { name: "냉장고", specs: "300ℓ 이상", fee: "12000" },
    { name: "냉장고", specs: "300ℓ 미만", fee: "8000" },
    { name: "텔레비전", specs: "42인치 이상", fee: "10000" },
    { name: "텔레비전", specs: "25~42인치 미만", fee: "4000" },
    { name: "텔레비전", specs: "25인치 미만", fee: "3000" },
    { name: "세탁기", specs: "용량8㎏ 이상", fee: "6000" },
    { name: "세탁기", specs: "용량8㎏ 미만", fee: "4000" },
    { name: "에어컨", specs: "264㎡형 이상", fee: "16000" },
    { name: "에어컨", specs: "66~264㎡형 미만", fee: "7000" },
    { name: "에어컨", specs: "66㎡ 미만", fee: "6000" },
    { name: "공기청정기", specs: "높이1m 이상", fee: "8000" },
  ];

  const groupedAppliances = appliances.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push({ specs: item.specs, fee: item.fee });
    return acc;
  }, {} as Record<string, { specs: string; fee: string }[]>);

  const furnitures = [
    { name: "침대", specs: "일반 2인용(매트리스 1개 포함)", fee: "18000" },
    { name: "침대", specs: "일반 1인용(매트리스 1개 포함)", fee: "13000" },
    { name: "침대", specs: "돌(흙,옥,황토)침대 2인용", fee: "36000" },
    { name: "침대", specs: "돌(흙,옥,황토)침대 1인용", fee: "24000" },
    { name: "침대", specs: "침대프레임(일반) 2인용", fee: "7000" },
    { name: "침대", specs: "침대프레임(일반) 1인용", fee: "5000" },
    { name: "침대", specs: "침대프레임(평상형) 2인용", fee: "15000" },
    { name: "침대", specs: "침대프레임(평상형) 1인용", fee: "11000" },
    { name: "침대", specs: "매트리스 2인용", fee: "11000" },
    { name: "침대", specs: "매트리스 1인용", fee: "9000" },
    { name: "침대", specs: "라텍스, 매트리스(포켓) 2인용", fee: "14000" },
    { name: "침대", specs: "라텍스, 매트리스(포켓) 1인용", fee: "10000" },
    { name: "침대", specs: "유아용(매트리스 포함)", fee: "9000" },
    { name: "소파", specs: "5인용 이상", fee: "17000" },
    { name: "소파", specs: "3인용", fee: "12000" },
    { name: "소파", specs: "2인용", fee: "9000" },
    { name: "소파", specs: "1인용", fee: "5000" },
    { name: "장롱", specs: "120㎝ 이상 1짝", fee: "17000" },
    { name: "장롱", specs: "90㎝ 이상 1짝", fee: "14000" },
    { name: "장롱", specs: "90㎝ 미만 1짝", fee: "10000" },
    { name: "서랍장", specs: "5단 이상", fee: "10000" },
    { name: "서랍장", specs: "5단 미만", fee: "6000" },
    { name: "책장 등(세로형)", specs: "가로 120cm 이상", fee: "14000" },
    {
      name: "책장 등(세로형)",
      specs: "가로 90cm 이상 120cm 미만",
      fee: "12000",
    },
    { name: "책장 등(세로형)", specs: "가로 90cm 미만", fee: "9000" },
    { name: "장식장(가로)", specs: "120㎝ 이상", fee: "10000" },
    { name: "장식장(가로)", specs: "90~120㎝ 미만", fee: "9000" },
    { name: "장식장(가로)", specs: "90㎝ 미만", fee: "7000" },
    { name: "화장대", specs: "90㎝ 이상", fee: "8000" },
    { name: "화장대", specs: "90㎝ 미만", fee: "5000" },
    { name: "신발장", specs: "가로 1m 이상", fee: "7000" },
    { name: "신발장", specs: "가로 1m 미만", fee: "5000" },
    { name: "캐비닛", specs: "높이 1m 이상", fee: "8000" },
    { name: "캐비닛", specs: "높이 1m 미만", fee: "4000" },
    { name: "옷걸이", specs: "모든 규격", fee: "2000" },
    { name: "책상", specs: "서랍장 2개 혹은 1m 이상", fee: "8000" },
    { name: "책상", specs: "서랍장 1개 혹은 1m 미만", fee: "5000" },
    { name: "책상", specs: "책상+책장 세트", fee: "12000" },
    { name: "책꽂이", specs: "50cm×50cm 이하", fee: "2000" },
    { name: "식탁", specs: "6인용 이상", fee: "7000" },
    { name: "식탁", specs: "6인용 미만", fee: "5000" },
    { name: "식탁", specs: "대리석 6인용 이상", fee: "17000" },
    { name: "식탁", specs: "대리석 6인용 미만", fee: "13000" },
    { name: "의자", specs: "목재, 철재", fee: "2000" },
    { name: "의자", specs: "목재, 철재 외", fee: "3000" },
    { name: "의자", specs: "회전, 안락, 사무용 의자", fee: "5000" },
    { name: "의자", specs: "안마의자", fee: "30000" },
    { name: "싱크대", specs: "1m 이상 1짝당", fee: "10000" },
    { name: "싱크대", specs: "1m 미만 1짝당", fee: "7000" },
    { name: "싱크찬장", specs: "1칸", fee: "4000" },
    { name: "싱크찬장", specs: "2칸", fee: "4000" },
    { name: "상", specs: "6인용 이상", fee: "3000" },
    { name: "상", specs: "4인용", fee: "2000" },
    { name: "상", specs: "2인용", fee: "1000" },
  ];

  const groupedFurnitures = furnitures.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push({ specs: item.specs, fee: item.fee });
    return acc;
  }, {} as Record<string, { specs: string; fee: string }[]>);

  const extras = [
    { name: "쌀통", specs: "모든 규격", fee: "4000" },
    { name: "전기매트", specs: "옥(황토)매트 3인용 이상", fee: "10000" },
    { name: "전기매트", specs: "옥(황토)매트 2인용", fee: "8000" },
    { name: "전기매트", specs: "옥(황토)매트 1인용", fee: "6000" },
    { name: "전기매트", specs: "일반 2인용", fee: "6000" },
    { name: "전기매트", specs: "일반 1인용", fee: "4000" },
    { name: "조명기구", specs: "장식용", fee: "5000" },
    { name: "조명기구", specs: "일반용", fee: "2000" },
    { name: "가스오븐레인지", specs: "높이1m 이상", fee: "4000" },
    { name: "가스오븐레인지", specs: "높이1m 미만", fee: "3000" },
    { name: "항아리", specs: "20ℓ 이상", fee: "3000" },
    { name: "항아리", specs: "20ℓ 미만", fee: "1000" },
    { name: "욕조", specs: "길이2m 이상", fee: "17000" },
    { name: "욕조", specs: "길이1m 이상 2m 미만", fee: "10000" },
    { name: "욕조", specs: "길이1m 미만", fee: "7000" },
    { name: "변기", specs: "모든 규격", fee: "9000" },
    { name: "비데", specs: "모든 규격", fee: "2000" },
    { name: "세면대", specs: "모든 규격", fee: "5000" },
    { name: "블라인드", specs: "모든 규격", fee: "3000" },
    { name: "이불", specs: "솜이불(1채당)", fee: "3000" },
    { name: "이불", specs: "홑이불(1채당)", fee: "2000" },
    { name: "카펫", specs: "3.3㎡당", fee: "7000" },
    { name: "돗자리", specs: "2인용", fee: "3000" },
    { name: "돗자리", specs: "1인용", fee: "2000" },
    { name: "피아노", specs: "그랜드", fee: "26000" },
    { name: "피아노", specs: "업라이트", fee: "17000" },
    { name: "피아노", specs: "디지털", fee: "7000" },
    { name: "시계", specs: "벽걸이용", fee: "1000" },
    { name: "시계", specs: "대형입식용", fee: "3000" },
    { name: "가방류", specs: "골프가방", fee: "3000" },
    { name: "가방류", specs: "여행용", fee: "2000" },
    { name: "가방류", specs: "그 외", fee: "1000" },
    { name: "재봉틀", specs: "모든 규격", fee: "3000" },
    { name: "병풍", specs: "모든 규격", fee: "3000" },
    { name: "우산", specs: "모든 규격", fee: "1000" },
    { name: "수족관", specs: "가로2m 이상", fee: "16000" },
    { name: "수족관", specs: "가로1~2m 미만", fee: "9000" },
    { name: "수족관", specs: "가로1m 미만", fee: "4000" },
    { name: "거울, 유리, 액자", specs: "50㎝ 이상", fee: "3000" },
    { name: "거울, 유리, 액자", specs: "50㎝ 미만", fee: "2000" },
    { name: "운동기구", specs: "실내자전거", fee: "7000" },
    { name: "운동기구", specs: "그 밖의 운동기구", fee: "4000" },
    { name: "보일러", specs: "연탄사용", fee: "6000" },
    { name: "보일러", specs: "기름사용", fee: "8000" },
    { name: "보일러", specs: "가스사용", fee: "6000" },
    { name: "난로", specs: "석유난로", fee: "5000" },
    { name: "난로", specs: "전기난로", fee: "3000" },
    { name: "기름탱크", specs: "2드럼 이상", fee: "6000" },
    { name: "기름탱크", specs: "2드럼 미만", fee: "3000" },
    { name: "물탱크", specs: "5드럼(1톤) 이상", fee: "18000" },
    { name: "물탱크", specs: "5드럼(1톤) 미만", fee: "13000" },
    { name: "정화조", specs: "10인용 이상", fee: "42000" },
    { name: "정화조", specs: "10인용 미만", fee: "26000" },
    { name: "자전거", specs: "성인용", fee: "3000" },
    { name: "자전거", specs: "소아용", fee: "2000" },
    { name: "유모차", specs: "2인용", fee: "4000" },
    { name: "유모차", specs: "1인용", fee: "3000" },
    { name: "보행기, 카시트", specs: "모든 규격", fee: "2000" },
    { name: "타이어", specs: "화물", fee: "8000" },
    { name: "타이어", specs: "승용", fee: "4000" },
    { name: "목재류", specs: "100ℓ 1마대", fee: "7000" },
    { name: "목재류", specs: "1톤 1차", fee: "98000" },
    { name: "문짝", specs: "목재, 철재", fee: "3000" },
    { name: "문짝", specs: "목재(유리포함)", fee: "6000" },
    { name: "문짝", specs: "유리문(강화유리)", fee: "9000" },
    { name: "합판", specs: "장당", fee: "3000" },
    { name: "비닐, 폐합성수지", specs: "100ℓ 마대당", fee: "6000" },
    { name: "천막", specs: "100ℓ 1마대", fee: "7000" },
    { name: "화분", specs: "20ℓ 이상(일반)", fee: "4000" },
    { name: "화분", specs: "20ℓ 미만(일반)", fee: "2000" },
    { name: "개집(FRP), 고양이타워", specs: "모든 규격", fee: "4000" },
    { name: "가스레인지", specs: "모든 규격", fee: "3000" },
    { name: "장판", specs: "1㎡당", fee: "2000" },
    { name: "스티로폼(재활용불가)", specs: "100ℓ 1마대", fee: "2000" },
    { name: "폐소화기", specs: "모든 규격", fee: "3000" },
  ];

  const groupedExtras = extras.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = [];
    acc[item.name].push({ specs: item.specs, fee: item.fee });
    return acc;
  }, {} as Record<string, { specs: string; fee: string }[]>);

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8">대형폐기물 처리 안내</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">대형폐기물이란?</h2>
        <p className="leading-relaxed">
          대형폐기물은 가구, 가전제품 등 일반쓰레기 수거가 불가능한 크고 무거운
          폐기물을 말합니다. 영도구청에서는 아래와 같은 방법으로 대형폐기물을
          배출할 수 있습니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">배출 방법</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>인터넷, 전화, 방문 접수를 통해 신고 후 스티커를 구입하여 부착</li>
          <li>배출일에 지정된 장소에 배출</li>
          <li>배출 전 반드시 신고 및 스티커 부착을 완료해야 함</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          대형폐기물 수수료 - 가전제품
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 text-white dark:bg-gray-700">
              <tr>
                <th className="w-4/12 p-3 border border-gray-300 dark:border-gray-600">
                  품 명
                </th>
                <th className="w-5/12 p-3 border border-gray-300 dark:border-gray-600">
                  규 격
                </th>
                <th className="w-3/12 p-3 border border-gray-300 dark:border-gray-600">
                  수수료 (원)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedAppliances).map(([name, items], idx) => (
                <React.Fragment key={idx}>
                  {items.map((item, subIdx) => (
                    <tr
                      key={subIdx}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors"
                    >
                      {subIdx === 0 ? (
                        <td
                          rowSpan={items.length}
                          className="p-3 border border-gray-300 dark:border-gray-600 text-center align-middle font-semibold bg-gray-100 dark:bg-gray-700"
                        >
                          {name}
                        </td>
                      ) : null}
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center">
                        {item.specs}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center pr-5 font-semibold">
                        {parseInt(item.fee).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          대형폐기물 수수료 - 가구류
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 text-white dark:bg-gray-700">
              <tr>
                <th className="w-4/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  품 명
                </th>
                <th className="w-5/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  규 격
                </th>
                <th className="w-3/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  수수료 (원)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedFurnitures).map(([name, items], idx) => (
                <React.Fragment key={idx}>
                  {items.map((item, subIdx) => (
                    <tr
                      key={subIdx}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors"
                    >
                      {subIdx === 0 && (
                        <td
                          rowSpan={items.length}
                          className="p-3 border border-gray-300 dark:border-gray-600 text-center align-middle font-semibold bg-gray-100 dark:bg-gray-700"
                        >
                          {name}
                        </td>
                      )}
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center">
                        {item.specs}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center pr-5 font-semibold">
                        {parseInt(item.fee).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          대형폐기물 수수료 - 생활용품 및 기타
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800">
            <thead className="bg-gray-800 text-white dark:bg-gray-700">
              <tr>
                <th className="w-4/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  품 명
                </th>
                <th className="w-5/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  규 격
                </th>
                <th className="w-3/12 p-3 border border-gray-300 dark:border-gray-600 text-center">
                  수수료 (원)
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedExtras).map(([name, items], idx) => (
                <React.Fragment key={idx}>
                  {items.map((item, subIdx) => (
                    <tr
                      key={subIdx}
                      className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-colors"
                    >
                      {subIdx === 0 && (
                        <td
                          rowSpan={items.length}
                          className="p-3 border border-gray-300 dark:border-gray-600 text-center align-middle font-semibold bg-gray-100 dark:bg-gray-700"
                        >
                          {name}
                        </td>
                      )}
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center">
                        {item.specs}
                      </td>
                      <td className="p-3 border border-gray-300 dark:border-gray-600 text-center pr-5 font-semibold">
                        {parseInt(item.fee).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <ul>
          <li>● 길이는 가로/세로의 구분없이 긴쪽 기준</li>
          <li>
            ● 품명에 명시되지 않은 대형폐기물은 종류 및 규격을 감안 유사품목의
            수수료를 준용
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">문의처</h2>
        <p>영도구청 환경과: 051-410-1234</p>
      </section>
    </div>
  );
}
