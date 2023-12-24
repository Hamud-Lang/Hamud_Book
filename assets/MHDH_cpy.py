import os
import requests
import re
from bs4 import BeautifulSoup

# pip install requests
# pip install beautifulsoup4

def save_section_content(url, path, domain):
    # 发送 GET 请求获取网页内容
    response = requests.get(url)
    response.raise_for_status()

    # 解析网页内容
    soup = BeautifulSoup(response.text, 'html.parser')

    # 删除指定的元素
    for element_id in ['cosmos-header-interlang', 'cosmos-articleHeader-actions', 'printfooter', 'cosmos-content-additionalContent', 'CosmosRailWrapper']:
        element = soup.find('div', {'id': element_id}) or soup.find('span', {'id': element_id})
        if element:
            element.decompose()

    # 获取 <section id="mw-content"> 元素
    section = soup.find('section', {'id': 'mw-content'})

    # 处理内容内域名
    section = replace_href_domain(section, domain)

    if section:
        # 获取网页标题
        title = soup.title.string.strip()
        # 替换无效的文件名字符
        title = title.replace('/', '-').replace('\\', '-').replace(':', '-').replace('*', '-').replace('?', '-').replace('"', "'").replace('<', '[').replace('>', ']')

        # 构造保存的文件路径
        save_path = os.path.join(path, f'{title}.md')
        
        # 保存 <section> 元素内的内容到文件
        with open(save_path, 'w', encoding='utf-8') as file:
            file.write(section.prettify())

        print(f'内容已保存到文件：{save_path}')
    else:
        print('未找到指定的 <section id="mw-content"> 元素')

def replace_href_domain(content, domain):

    # 查找所有 <a> 标签
    for a in content.find_all('a', href=True):
        # 获取 href 属性的值
        href = a['href']
        # 如果 href 属性的值以 / 开头，则替换为指定域名
        if href.startswith('/'):
            a['href'] = f'{domain}{href}'

    # 返回修改后的 HTML 内容
    return content

def batch_remove_string_in_filename(folder_path, target_string):
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if target_string in file_name:
                new_file_name = file_name.replace(target_string, '')
                os.rename(os.path.join(root, file_name), os.path.join(root, new_file_name))

# 执行
path = './src/World_line/'
domain = '//mhdh.pj568.eu.org'
# Hamud
save_section_content('https://mhdh.pj568.eu.org/wiki/%E5%93%88%E5%A7%86', path, domain)
# Index
save_section_content('https://mhdh.pj568.eu.org/wiki/MHDH%E4%B8%96%E7%95%8C%E7%BA%BF', path, domain)
# Languages
save_section_content('https://mhdh.pj568.eu.org/wiki/%E8%AF%AD%E8%A8%80%E5%88%97%E8%A1%A8', path, domain)
# Graph
save_section_content('https://mhdh.pj568.eu.org/wiki/%E6%89%80%E6%9C%89%E5%9B%BE%E4%BE%8B', path, domain)
# Nations
save_section_content('https://mhdh.pj568.eu.org/wiki/MHDH%E7%8E%B0%E5%AD%98%E5%9B%BD%E5%AE%B6%E5%88%97%E8%A1%A8', path, domain)
# HIL
save_section_content('https://mhdh.pj568.eu.org/wiki/HITL%E4%B8%96%E7%95%8C%E7%BA%BF', path, domain)
# 哈姆民族
save_section_content('https://mhdh.pj568.eu.org/wiki/%E5%93%88%E5%A7%86%E6%B0%91%E6%97%8F%E5%88%97%E8%A1%A8', path, domain)
# 哈姆文化
save_section_content('https://mhdh.pj568.eu.org/wiki/%E5%93%88%E5%A7%86%E6%96%87%E5%8C%96%E5%88%97%E8%A1%A8', path, domain)
# 哈姆方言
save_section_content('https://mhdh.pj568.eu.org/wiki/%E5%93%88%E5%A7%86%E6%96%B9%E8%A8%80%E5%88%97%E8%A1%A8', path, domain)

batch_remove_string_in_filename(path, ' - MHDH维基')

# save_section_content('#####', path, domain)
# save_section_content('#####', path, domain)
# save_section_content('#####', path, domain)
# save_section_content('#####', path, domain)
# save_section_content('#####', path, domain)