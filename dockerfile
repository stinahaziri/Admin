FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    apt-transport-https \
    software-properties-common \
    dotnet-runtime-7.0 \
    curl \
    ca-certificates \
    gnupg

# Add Microsoft package repo
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/keyrings/microsoft.gpg && \
    chmod go+r /etc/apt/keyrings/microsoft.gpg

RUN echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/microsoft.gpg] https://packages.microsoft.com/ubuntu/22.04/prod jammy main" | tee /etc/apt/sources.list.d/microsoft.list

# Install .NET 9 SDK (preview)
RUN apt-get update && \
    apt-get install -y dotnet-sdk-9.0

# Set working directory
WORKDIR /app

# Copy project
COPY . .

# Publish app
RUN dotnet publish "Admin.csproj" -c Release -o out

# Runtime image
FROM ubuntu:22.04
RUN apt-get update && \
    apt-get install -y dotnet-runtime-9.0

WORKDIR /app
COPY --from=0 /app/out .

ENTRYPOINT ["dotnet", "Admin.dll"]
