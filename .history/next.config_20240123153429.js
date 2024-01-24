/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async headers() {
        return [
            {
                source: '/api/your-api-endpoint',
                headers: [
                    {
                    key: 'Access-Control-Allow-Origin',
                    value: '*', // 특정 origin만 허용하려면 해당 origin을 입력
                    },
                ],
            },
        ];
    },
};
