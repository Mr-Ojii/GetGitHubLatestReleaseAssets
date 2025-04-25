# GetGitHubLatestReleaseAssets
LatestReleaseAssetsの取得がめんどくさいので、一連の流れにしてしまおうというもの。

## 使い方
クエリパラメータに

|Name   |Value                                                                                                          |
|:------|:--------------------------------------------------------------------------------------------------------------|
|url    |GitHub APIのreleaseURL                                                                                         |
|user   |対象リポジトリのユーザー(オーガナイゼーション)名                                                               |
|repo   |対象リポジトリのリポジトリ名                                                                                   |
|pre    |プレリリースであるか true=1,false=0                                                                            |
|search |ファイル名に指定文字列が含まれているものを返します。(どれにも含まれていなかった場合は、1番目のものを返します。)|

とつけてください。

urlパラメータは互換性のために維持していますが、userとrepoパラメータが指定されている場合はそちらが優先されます。

## Link
[https://Mr-Ojii.github.io/GetGitHubLatestReleaseAssets](https://Mr-Ojii.github.io/GetGitHubLatestReleaseAssets)  
↑  
現状このままでは意味がないですが…