const url = import.meta.env.VITE_GOOGLE_SCRIPT_WEBAPP_URL;

export const sendFeedback = async (data: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> => {
  if (!url) {
    console.error('VITE_GOOGLE_SCRIPT_WEBAPP_URL이 설정되지 않았습니다.');
    return false;
  }

  const formData = new URLSearchParams();
  formData.append('name', data.name || '');
  formData.append('email', data.email || '');
  formData.append('message', data.message || '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.text();
    return result.trim().toLowerCase() === 'success';
  } catch (error) {
    console.error('의견 전송 실패:', error);
    return false;
  }
};
